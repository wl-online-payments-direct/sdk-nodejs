/* eslint-disable guard-for-in, no-restricted-syntax, no-param-reassign, no-plusplus */
const _ = require('lodash');

const headers = require('./headers');
const connection = require('./connection');

const addServerMetaInfo = function (options, extraHeaders, sdkContext) {
  // add X-GCS-ServerMetaInfo
  const serverMetaInfo = headers.serverMetaInfo(sdkContext);
  options.headers[serverMetaInfo.key] = serverMetaInfo.value;
  extraHeaders.push(serverMetaInfo);
};

const addIdemPotenceHeader = function (o, options, extraHeaders) {
  // add idemPotence header
  if (o.paymentContext && o.paymentContext.idemPotence) {
    const idemPotenceKey = o.paymentContext.idemPotence.key;
    const idemPotenceHeader = {
      key: 'X-GCS-Idempotence-Key',
      value: idemPotenceKey,
    };
    options.headers[idemPotenceHeader.key] = idemPotenceHeader.value;
    extraHeaders.push(idemPotenceHeader);
  }
};

const addExtraHeaders = function (o, options, extraHeaders) {
  if (o.paymentContext && o.paymentContext.extraHeaders) {
    for (let i = 0; i < o.paymentContext.extraHeaders.length; i++) {
      const header = o.paymentContext.extraHeaders[i];
      options.headers[header.key] = _.trim(header.value.replace(/\r?\n[\\s&&[^\r\n]]*/g, ' '));
      extraHeaders.push(header);
    }
  }
};

const constructRequestPath = function (o) {
  let path = o.modulePath;
  if (o.paymentContext) {
    let separator = '?';
    for (const key in o.paymentContext) {
      if (key !== 'extraHeaders' && key !== 'idemPotence') {
        if (_.isArray(o.paymentContext[key])) {
          for (const value in o.paymentContext[key]) {
            path += `${separator + key}=${o.paymentContext[key][value]}`;
            separator = '&';
          }
        } else {
          path += `${separator + key}=${o.paymentContext[key]}`;
          separator = '&';
        }
      }
    }
  }
  return path;
};

const prepareRequest = function (o, sdkContext, options, contentType) {
  const date = headers.date();
  options.path = constructRequestPath(o);
  options.method = o.method;
  options.headers.Date = date;

  if (o.body && (o.method === 'POST' || o.method === 'PUT')) {
    options.headers['Content-Type'] = contentType;
  } else {
    contentType = '';
  }

  const extraHeaders = [];
  addIdemPotenceHeader(o, options, extraHeaders);
  addServerMetaInfo(options, extraHeaders, sdkContext);
  addExtraHeaders(o, options, extraHeaders);

  options.headers.Authorization = `GCS v1HMAC:${sdkContext.getContext().apiKeyId}:${sdkContext.getSignature(
    o.method,
    contentType,
    date,
    extraHeaders,
    options.path
  )}`;
};

const handleResponse = function (error, response, cb, sdkContext) {
  if (error) {
    cb(error, null);
  } else {
    if (response.headers['x-gcs-idempotence-request-timestamp']) {
      sdkContext.setIdempotenceRequestTimestamp(response.headers['x-gcs-idempotence-request-timestamp']);
    }

    let body = '';

    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function () {
      try {
        body = body ? JSON.parse(body) : null;
        cb(null, {
          status: response.statusCode,
          body,
          isSuccess: response.statusCode >= 200 && response.statusCode < 300,
        });
      } catch (e) {
        cb(
          {
            status: response.statusCode,
            message: e.message,
            body,
          },
          null
        );
      }
    });
  }
};

const json = function (o, sdkContext) {
  const options = _.merge({}, sdkContext.getContext().httpOptions);
  prepareRequest(o, sdkContext, options, 'application/json');
  connection.sendJSON(options, o.body, sdkContext, function (error, response) {
    handleResponse(error, response, o.cb, sdkContext);
  });
};

const communicator = {
  json,
};

module.exports = communicator;

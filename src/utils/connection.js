/* eslint-disable no-restricted-syntax */
const http = require('http');
const https = require('https');
const uuid = require('uuid');
const FormData = require('form-data');
const obfuscate = require('./obfuscate');
const headers = require('./headers');

const handleResponse = function (res, context, logger, uuidString, cb) {
  if (context.isLoggingEnabled()) {
    let body = '';

    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function () {
      if (context.isLoggingEnabled()) {
        const obfuscatedBody = headers.isJSON(res.headers['content-type'])
          ? obfuscate.getObfuscated(body, context)
          : body;
        logger(
          'info',
          `Response from Message ID: ${uuidString}, status: ${res.statusCode}, headers: ${obfuscate.getObfuscated(
            res.headers,
            context
          )}, body: ${obfuscatedBody}`
        );
      }
    });
  }

  cb(null, res);
};

const handleError = function (e, context, logger, uuidString, cb) {
  if (context.isLoggingEnabled()) {
    logger('error', `Error for Message ID:${uuidString}, error: ${JSON.stringify(e)}`);
  }
  cb(e, null);
};

function sendRequest(options, postData, context, cb) {
  const logger = context.getLogger();
  const uuidString = uuid.v4();

  // set X-Request-Id for better traceability
  // eslint-disable-next-line no-param-reassign
  options.headers['X-Request-Id'] = uuidString;

  if (context.isLoggingEnabled()) {
    logger(
      'info',
      `Request with Message ID: ${uuidString}, ${options.method} to ${options.path}, headers: ${obfuscate.getObfuscated(
        options.headers,
        context
      )}, body: ${obfuscate.getObfuscated(postData, context)}`
    );
  }
  const h = options.protocol === 'https:' ? https : http;
  const req = h.request(options, function (res) {
    handleResponse(res, context, logger, uuidString, cb);
  });
  req.on('error', function (e) {
    handleError(e, context, logger, uuidString, cb);
  });
  return req;
}

const sendJSON = function (options, postData, context, cb) {
  const body = postData ? JSON.stringify(postData) : null;
  if (body) {
    // eslint-disable-next-line no-param-reassign
    options.headers['Content-Length'] = Buffer.byteLength(body);
  }

  const req = sendRequest(options, postData, context, cb);

  if (body) {
    req.write(body);
  }
  req.end();
};

const sendMultipart = function (options, postData, boundary, context, cb) {
  const req = sendRequest(options, postData, context, cb);

  const form = new FormData();
  // Use the provided boundary instead of letting the form generate one
  form.setBoundary(boundary);
  if (postData) {
    for (const key in postData) {
      // eslint-disable-next-line no-prototype-builtins
      if (postData.hasOwnProperty(key)) {
        const item = postData[key];
        if (typeof item === 'object') {
          if (!item.fileName) {
            cb(new Error(`${key}: fileName is required`), null);
            return;
          }
          if (!item.contentType) {
            cb(new Error(`${key}: contentType is required`), null);
            return;
          }
          if (!item.content) {
            cb(new Error(`${key}: content is required`), null);
            return;
          }
          const opts = {
            filename: item.fileName,
            contentType: item.contentType,
          };
          if (item.contentLength || item.contentLength === 0) {
            opts.knownLength = item.contentLength;
          }
          form.append(key, item.content, opts);
        } else if (typeof item !== 'undefined') {
          form.append(key, item);
        }
      }
    }
  }
  form.pipe(req);
};

const connect = {
  sendJSON,
  sendMultipart,
};

module.exports = connect;

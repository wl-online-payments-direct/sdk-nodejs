/* eslint-disable no-restricted-syntax */
const http = require('http');
const https = require('https');

const uuid = require('uuid');

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

const sendJSON = function (options, postData, context, cb) {
  const logger = context.getLogger();
  const uuidString = uuid.v4();
  const body = postData ? JSON.stringify(postData) : null;
  if (body) {
    // eslint-disable-next-line no-param-reassign
    options.headers['Content-Length'] = Buffer.byteLength(body);
  }
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

  if (body) {
    req.write(body);
  }
  req.end();
};

const connect = {
  sendJSON,
};

module.exports = connect;

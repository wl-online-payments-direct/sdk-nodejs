/* This file was auto-generated. */

const createToken = require('./createToken');
const getToken = require('./getToken');
const removeToken = require('./removeToken');

module.exports = function (sdkContext) {
  return {
    createToken: createToken(sdkContext),
    getToken: getToken(sdkContext),
    removeToken: removeToken(sdkContext),
  };
};

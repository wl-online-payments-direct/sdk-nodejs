/* This file was auto-generated. */

const createPayout = require('./createPayout');
const getPayout = require('./getPayout');

module.exports = function (sdkContext) {
  return {
    createPayout: createPayout(sdkContext),
    getPayout: getPayout(sdkContext),
  };
};

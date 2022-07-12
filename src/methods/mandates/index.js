/* This file was auto-generated. */

const createMandate = require('./createMandate');
const getMandate = require('./getMandate');
const blockMandate = require('./blockMandate');
const unblockMandate = require('./unblockMandate');
const revokeMandate = require('./revokeMandate');

module.exports = function (sdkContext) {
  return {
    createMandate: createMandate(sdkContext),
    getMandate: getMandate(sdkContext),
    blockMandate: blockMandate(sdkContext),
    unblockMandate: unblockMandate(sdkContext),
    revokeMandate: revokeMandate(sdkContext),
  };
};

/* This file was auto-generated. */

const getProductGroups = require('./getProductGroups');
const getProductGroup = require('./getProductGroup');

module.exports = function (sdkContext) {
  return {
    getProductGroups: getProductGroups(sdkContext),
    getProductGroup: getProductGroup(sdkContext),
  };
};

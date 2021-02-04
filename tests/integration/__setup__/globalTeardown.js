const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));
const { teardown } = require('jest-dev-server');
const { openApiDocPath } = require('../__fixture__/config');

module.exports = async () => {
  await rimraf(openApiDocPath);
  return teardown();
};

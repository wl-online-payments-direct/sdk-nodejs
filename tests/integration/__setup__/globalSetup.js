const fs = require('fs').promises;
const Converter = require('swagger2openapi');
const { setup: setupServer } = require('jest-dev-server');
const { port, openApiUrl, openApiDocPath, enableLogging } = require('../__fixture__/config');

module.exports = async () => {
  const convertOptions = {
    source: openApiUrl,
    origin: true,
    patch: true,
    resolve: true,
  };
  const convertedDoc = await Converter.convertUrl(openApiUrl, convertOptions);

  const openApiDocContent = JSON.stringify(convertedDoc.openapi, null, 2);

  await fs.writeFile(openApiDocPath, openApiDocContent, 'utf-8');

  return setupServer({
    command: `prism mock ${openApiDocPath} --p=${port}`,
    port,
    launchTimeout: 20 * 1000,
    debug: enableLogging,
  });
};

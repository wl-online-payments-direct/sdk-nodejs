const fs = require('fs').promises;
const Converter = require('api-spec-converter');
const { setup: setupServer } = require('jest-dev-server');
const { port, openApiUrl, openApiDocPath, enableLogging } = require('../__fixture__/config');

module.exports = async () => {
  const convertedDoc = await Converter.convert({
    from: 'swagger_2',
    to: 'openapi_3',
    syntax: 'json',
    source: openApiUrl,
  });

  const openApiDocContent = JSON.stringify(convertedDoc.spec, null, 2);

  await fs.writeFile(openApiDocPath, openApiDocContent, 'utf-8');

  return setupServer({
    command: `prism mock ${openApiDocPath} --p=${port}`,
    port,
    launchTimeout: 20 * 1000,
    debug: enableLogging,
  });
};

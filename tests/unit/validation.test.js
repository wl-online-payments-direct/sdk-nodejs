const sdkInstance = require('../../src');

describe('Validation', () => {
  test('it logs and throws an error when an invalid request field is provided.', async () => {
    // Verify that the proper error message is passed to the logger via a custom logger function.
    const loggerTestFunction = {
      error(obj) {
        expect(`${obj}`).toEqual(
          'instance.order is not allowed to have the additional property "aField",instance.order is not allowed to have the additional property "anotherField"'
        );
      },
    };
    const instance = sdkInstance.init({
      apiKeyId: 'aKey',
      secretApiKey: 'aSecret',
      host: 'example.com',
      integrator: 'Test suite',
      enableLogging: true,
      logger: loggerTestFunction,
    });

    // Trigger an error by providing a request object with an unspecified field.
    const invalidRequest = { order: { aField: 'aValue', anotherField: 'anotherValue' } };
    const errorTrigger = () => {
      return instance.hostedCheckout.createHostedCheckout('aMerchantId', invalidRequest, null, null);
    };

    await expect(errorTrigger).rejects.toThrow(
      'instance.order: is not allowed to have the additional property "aField"\n' +
        'instance.order: is not allowed to have the additional property "anotherField"'
    );
  });
});

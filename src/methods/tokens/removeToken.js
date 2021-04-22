/*
 * This file was auto-generated from the API references found at
 * https://support.direct.ingenico.com/documentation/api/reference/
 */
const communicator = require('../../utils/communicator');

const deleteToken = (merchantId, tokenId, paymentContext, cb) => {
  communicator.json({
    method: 'DELETE',
    modulePath: `/v2/${merchantId}/tokens/${tokenId}`,
    body: null,
    paymentContext,
    cb,
  });
};

module.exports = deleteToken;
const { SESClient } = require('@aws-sdk/client-ses');
const { IAMClient } = require('@aws-sdk/client-iam');
const { AWS_SES_REGION } = require('../config');

module.exports = {
    iam: new IAMClient({}),
    ses: new SESClient({ region: AWS_SES_REGION }),
};

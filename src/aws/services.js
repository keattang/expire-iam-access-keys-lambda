// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require('aws-sdk');
const { AWS_SES_REGION } = require('../config');

module.exports = {
    iam: new AWS.IAM(),
    ses: new AWS.SES({ region: AWS_SES_REGION }),
};

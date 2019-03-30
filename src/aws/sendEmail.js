const { ses } = require('./services');
const { DRY_RUN } = require('../config');

const sendEmail = (to, from, subject, body) => {
    const payload = {
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: body,
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: body.replace(/<br><br>/g, '').replace(/<\/?b>/g, ''),
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject,
            },
        },
        Source: from,
    };

    if (DRY_RUN) return Promise.resolve();

    return ses.sendEmail(payload).promise();
};

module.exports = sendEmail;

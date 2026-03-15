// notifications library
// important fucntions to notify users

// dependencies

const https = require('https');
const querystring = require('querystring');
const { hostname } = require('os');
const { twilio } = require('./environment');

// module scaffolding
const notifications = {};

// send sms to user using twilio api

notifications.sendTwilionSms = (phone, msg, callback) => {
    const userPhone =        typeof phone === 'string' && phone.trim().length === 11 ? phone.trim() : false;

    const userMsg =        typeof msg === 'string' && msg.trim().length > 0 && msg.trim().length <= 1600
            ? msg.trim()
            : false;
    if (userPhone && userMsg) {
        // configure the req payload
        const payload = {
            From: twilio.fromPhone,
            To: `+88${userPhone}`,
            Body: userMsg,
        };

        // stringify the payload

        const stringifyPayload = querystring.stringify(payload);
        // configure the req details
        const requestDetails = {
            hostname: 'api.twilio.com',
            method: 'POST',
            path: `/2010-04-01/Accounts/${twilio.accountSid}/Messages.json`,
            auth: `${twilio.accountSid}:${twilio.authToken}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        // intentiate the req obj

        const req = https.request(requestDetails, (res) => {
            // get the status
            const status = res.statusCode;
            // callback successfully if the req went through
            if (status === 200 || status === 201) {
                callback(false);
            } else {
                callback(`given code return was  ${status}`);
            }
        });
        req.on('error', (e) => {
            callback(e);
        });
        req.write(stringifyPayload);
        req.end();
    } else {
        callback('Given paarameter were missing');
    }
};

// export the module
module.exports = notifications;

// token handler
// route handler to handler token related routes
// module scaffolding
const handler = {};

// dependencies
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilities');
const { createRandomString } = require('../../helpers/utilities');

const { parseJSON } = require('../../helpers/utilities');
const { userHandler } = require('./userHandler');

handler.tokenHandler = (requestProparties, callback) => {
    console.log(requestProparties);
    const acceptedMethod = ['get', 'post', 'put', 'delete'];
    if (acceptedMethod.indexOf(requestProparties.method) > -1) {
        handler._token[requestProparties.method](requestProparties, callback);
    } else {
        callback(405);
    }
};
handler._token = {};
handler._token.post = (requestProparties, callback) => {
    const phone =        typeof requestProparties.body.phone === 'string' &&
        requestProparties.body.phone.trim().length === 11
            ? requestProparties.body.phone
            : false;

    const password =        typeof requestProparties.body.password === 'string' &&
        requestProparties.body.password.trim().length > 0
            ? requestProparties.body.password
            : false;

    if (phone && password) {
        data.read('user', phone, (err1, userData) => {
            const hashedPassword = hash(password);


            if (hashedPassword === parseJSON(userData).password) {
                const tokenId = createRandomString(20);
                const expires = Date.now() + 60 * 60 * 1000;

                const tokenObject = {
                    phone,
                    id: tokenId,
                    expires,
                };

                // store the token
                data.create('tokens', tokenId, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200, tokenObject);
                    } else {
                        callback(500, {
                            error: 'serverside error',
                        });
                    }
                });
            } else {
                callback(400, {
                    error: 'password is not match',
                });
            }
        });
    } else {
        callback(400, {
            error: 'you have a problem in your request',
        });
    }
};
handler._token.get = (requestProparties, callback) => {};
handler._token.put = (requestProparties, callback) => {};
handler._token.delete = (requestProparties, callback) => {};

module.exports = handler;

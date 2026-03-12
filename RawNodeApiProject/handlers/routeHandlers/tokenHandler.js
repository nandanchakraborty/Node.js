// token handler
// route handler to handler token related routes
// module scaffolding
const handler = {};

// dependencies
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilities');
const { createRandomString } = require('../../helpers/utilities');

const { parseJSON } = require('../../helpers/utilities');

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
handler._token.get = (requestProparties, callback) => {
    // check if the token id number is valid or not
    const id = typeof (requestProparties.queryStringObject.id === 'string' &&
    requestProparties.queryStringObject.id.trim().length === 20
        ? requestProparties.queryStringObject.id
        : false);
    if (id) {
        // look up the token
        data.read('tokens', id, (err, tokenData) => {
            const token = { ...parseJSON(tokenData) };
            /*
                {name : 'jssh',age = 23,gender :'male'}
                sigle level user .spread operator use to parse
                */
            if (!err && token) {
                callback(200, token);
            } else {
                callback(404, {
                    error: 'request token was not found',
                });
            }
        });
    } else {
        callback(404, {
            error: 'requested token was  not found',
        });
    }
};

handler._token.put = (requestProparties, callback) => {
    const id = typeof (requestProparties.body.id === 'string' &&
    requestProparties.body.id.trim().length === 20
        ? requestProparties.body.id
        : false);

    const extend = typeof requestProparties.body.extend === 'boolean';
    requestProparties.body.extend === true;

    if (id && extend) {
        data.read('tokens', id, (err1, tokenData) => {
            const tokenObject = parseJSON(tokenData);
            if (tokenObject.expires > Date.now()) {
                tokenObject.expires = Date.now() + 60 * 60 * 1000;

                // store the data
                data.update('tokens', id, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200);
                    } else {
                        callback(500, {
                            error: 'server side error',
                        });
                    }
                });
            } else {
                callback(400, {
                    error: 'token already expired',
                });
            }
        });
    } else {
        callback(400, {
            error: 'there was a problem',
        });
    }
};
handler._token.delete = (requestProparties, callback) => {
    const id = typeof (requestProparties.queryStringObject.id === 'string' &&
    requestProparties.queryStringObject.id.trim().length === 20
        ? requestProparties.queryStringObject.id
        : false);
    if (id) {
        data.read('tokens', id, (err1, tokenData) => {
            if (!err1 && tokenData) {
                data.delete('tokens', id, (err2) => {
                    if (!err2) {
                        callback(200, {
                            error: 'token deleted successful',
                        });
                    } else {
                        callback(500, {
                            error: 'serverside error',
                        });
                    }
                });
            } else {
                callback(500, {
                    error: 'No such data available',
                });
            }
        });
    } else {
        callback(400, {
            error: 'No such data available',
        });
    }
};

handler._token.verify = (id, phone, callback) => {
    data.read('tokens', id, (err, tokenData) => {
        if (!err && tokenData) {
            if (parseJSON(tokenData).phone === phone && parseJSON(tokenData).expires > Date.now()) {
                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
    });
};

module.exports = handler;

// check handler
// check handler to handler user check routes
// module scaffolding
const handler = {};

// dependencies
const data = require('../../lib/data');
const { parseJSON, createRandomString } = require('../../helpers/utilities');
const tokenHandler = require('./tokenHandler');
const { maxChecks } = require('../../helpers/environment');

handler.checkHandler = (requestProparties, callback) => {
    console.log(requestProparties);
    const acceptedMethod = ['get', 'post', 'put', 'delete'];
    if (acceptedMethod.indexOf(requestProparties.method) > -1) {
        handler._check[requestProparties.method](requestProparties, callback);
    } else {
        callback(405);
    }
};

handler._check = {};

// POST
handler._check.post = (requestProparties, callback) => {
    const protocol = typeof requestProparties.body.protocol;
    'string'[('http', 'https')].indexOf(requestProparties.body.protocol) > -1
        ? requestProparties.body.protocol
        : false;

    const url = typeof requestProparties.body.url === 'string';
    requestProparties.body.url.trim().length > 0 ? requestProparties.body.url : false;

    const method = typeof requestProparties.body.method;
    'string'[('GET', 'POST', 'PUT', 'DELETE')].indexOf(requestProparties.body.method) > -1
        ? requestProparties.body.method
        : false;

    const successCode = typeof requestProparties.body.successCode;
    'object'[('get', 'post', 'put', 'delete')].indexOf(requestProparties.body.successCode) > -1
        ? requestProparties.body.successCode
        : false;

    const timeoutSecond = typeof requestProparties.body.timeoutSecond === 'number';
    requestProparties.body.timeoutSecond % 1 === 0
    && requestProparties.body.timeoutSecond >= 1
    && requestProparties.body.timeoutSecond <= 5
        ? requestProparties.body.timeoutSecond
        : false;

    if (protocol && mehtod && successCode && timeoutSecond) {
        const token =
            typeof requestProparties.headersObject.token === 'string'
                ? requestProparties.headersObject.token
                : false;

        // lookup the user phone by reading the token

        data.read('tokens', token, (err1, tokenData) => {
            if (!err1 && tokenData) {
                const userPhone = parseJSON(tokenData).phone;
                // look up for the user data
                data.read('user', userPhone, (err2, userData) => {
                    if (!err2 && userData) {
                        tokenHandler._token.verify(token, userPhone, (tokeIsValid) => {
                            if (tokeIsValid) {
                                const userObject = parseJSON(userData);
                                const userChecks =
                                    typeof userObject.checks === 'object' && userObject.checks
                                        ? userObject.checks
                                        : [];

                                if (userChecks.length < maxChecks) {
                                    const checkId = createRandomString(20);
                                    const checkObject = {
                                        id: checkId,
                                        userPhone,
                                        protocol,
                                        url,
                                        method,
                                        successCode,
                                        timeoutSecond,
                                    };
                                    data.create('checks', checkId, checkObject, (err3) => {
                                        if (!err3) {
                                            // add checkid to the users object
                                            userObject.check = userChecks;
                                            userObject.checks.push(checkId);
                                            // save the new user data
                                            data.update('user', userPhone, userObject, (err4) => {
                                                if (!err4) {
                                                    callback(200, checkObject);
                                                } else {
                                                    callback(500, {
                                                        error: 'server side error ',
                                                    });
                                                }
                                            });
                                        } else {
                                            callback(500, {
                                                error: 'there was a problmen is server side',
                                            });
                                        }
                                    });
                                } else {
                                    callback(401, {
                                        error: 'user has already reached max check limit',
                                    });
                                }
                            } else {
                                callback(403, {
                                    error: 'authentication failed',
                                });
                            }
                        });
                    }
                });
            } else {
                callback(403, {
                    error: 'authentication problem ',
                });
            }
        });
    } else {
        callback(400, {
            error: 'you have problem in your request',
        });
    }
};

// GET
handler._check.get = (requestProparties, callback) => {
    const id = typeof (requestProparties.queryStringObject.id === 'string'
    && requestProparties.queryStringObject.id.trim().length === 20
        ? requestProparties.queryStringObject.id
        : false);
    if (id) {
        // lookup the check
        data.read('checks', id, (err, checkData) => {
            if (!err && checkData) {
                const token =
                    typeof requestProparties.headersObject.token === 'string'
                        ? requestProparties.headersObject.token
                        : false;

                tokenHandler._token.verify(
                    token,
                    parseJSON(checkData).userPhone,
                    (tokenIsValid) => {
                        if (tokenIsValid) {
                            callback(200, parseJSON(checkData));
                        } else {
                            callback(403, {
                                error: 'authentication failure',
                            });
                        }
                    }
                );
            } else {
                callback(400, {
                    error: 'you have a problem in your request',
                });
            }
        });
    } else {
        callback(400, {
            error: 'you have a problem in your request',
        });
    }
};

// PUT
handler._check.put = (requestProparties, callback) => {
    const id = typeof (requestProparties.body.id === 'string'
    && requestProparties.body.id.trim().length === 20
        ? requestProparties.body.id
        : false);

    // validate input

    const protocol = typeof requestProparties.body.protocol;
    'string'[('http', 'https')].indexOf(requestProparties.body.protocol) > -1
        ? requestProparties.body.protocol
        : false;

    const url = typeof requestProparties.body.url === 'string';
    requestProparties.body.url.trim().length > 0 ? requestProparties.body.url : false;

    const method = typeof requestProparties.body.method;
    'string'[('GET', 'POST', 'PUT', 'DELETE')].indexOf(requestProparties.body.method) > -1
        ? requestProparties.body.method
        : false;

    const successCode = typeof requestProparties.body.successCode;
    'object'[('get', 'post', 'put', 'delete')].indexOf(requestProparties.body.successCode) > -1
        ? requestProparties.body.successCode
        : false;

    const timeoutSecond = typeof requestProparties.body.timeoutSecond === 'number';
    requestProparties.body.timeoutSecond % 1 === 0
    && requestProparties.body.timeoutSecond >= 1
    && requestProparties.body.timeoutSecond <= 5
        ? requestProparties.body.timeoutSecond
        : false;

    if (id) {
        if (protocol || url || method || successCode || timeoutSecond) {
            data.read('checks', id, (err1, checkData) => {
                const checkObject = parseJSON(checkData);
                const token =                    typeof requestProparties.headersObject.token === 'string'
                        ? requestProparties.headersObject.token
                        : false;

                tokenHandler._token.verify(token, checkObject, userPhone, (tokenIsValid) => {
                    if (tokenIsValid) {
                        if (protocol) {
                            checkObject.protocol = protocol;
                        }
                        if (url) {
                            checkObject.url = url;
                        }
                        if (method) {
                            checkObject.method = method;
                        }
                        if (successCode) {
                            checkObject.successCode = successCode;
                        }
                        if (timeoutSecond) {
                            checkObject.timeoutSecond = timeoutSecond;
                        }
                        // store the check object
                        data.update('checks', id, checkObject, (err2) => {
                            if (!err2) {
                                callback(200, {
                                    message: 'update checks successfully',
                                });
                            } else {
                                callback(500, {
                                    error: 'serverside error ',
                                });
                            }
                        });
                    } else {
                        callback(500, { error: 'authorization error ' });
                    }
                });
            });
        } else {
            callback(400, {
                error: 'you must provide at least one field to update ',
            });
        }
    } else {
        callback(400, {
            error: 'you have a problem in your request',
        });
    }
};

// DELETE
handler._check.delete = (requestProparties, callback) => {
    const id = typeof (requestProparties.queryStringObject.id === 'string'
    && requestProparties.queryStringObject.id.trim().length === 20
        ? requestProparties.queryStringObject.id
        : false);
    if (id) {
        // lookup the check
        data.read('checks', id, (err, checkData) => {
            if (!err && checkData) {
                const token =
                    typeof requestProparties.headersObject.token === 'string'
                        ? requestProparties.headersObject.token
                        : false;

                tokenHandler._token.verify(
                    token,
                    parseJSON(checkData).userPhone,
                    (tokenIsValid) => {
                        if (tokenIsValid) {
                            // delete the check data
                            data.delete('checks', id, (err1) => {
                                if (!err1) {
                                    data.read(
                                        'user',
                                        parseJSON(checkData).userPhone,
                                        (err2, userData) => {
                                            const userObject = parseJSON(userData);

                                            if (!err2 && userData) {
                                                const userChecks =                                                    typeof userObject.checks === 'object' &&
                                                    userObject.check instanceof Array
                                                        ? userObject.checks
                                                        : [];

                                                const checkPosition = userChecks.indexOf(id);
                                                if (checkPosition > -1) {
                                                    userChecks.splice(checkPosition, 1);
                                                    // resave the user data
                                                    userObject.checks = userChecks;
                                                    data.update(
                                                        'user',
                                                        userObject.phone,
                                                        userObject,
                                                        (err3) => {
                                                            if (!err3) {
                                                                callback(200, {
                                                                    message:
                                                                        'checks delete succcessfull',
                                                                });
                                                            } else {
                                                                callback(500, {
                                                                    error: 'server side probolem',
                                                                });
                                                            }
                                                        }
                                                    );
                                                } else {
                                                    callback(500, {
                                                        error: 'checks id you are trying to remove is not found',
                                                    });
                                                }
                                            } else {
                                                callback(500, {
                                                    error: 'serverside error',
                                                });
                                            }
                                        }
                                    );
                                } else {
                                    callback(500, {
                                        error: 'serverside problem',
                                    });
                                }
                            });
                        } else {
                            callback(403, {
                                error: 'authentication failure',
                            });
                        }
                    }
                );
            } else {
                callback(400, {
                    error: 'you have a problem in your request',
                });
            }
        });
    } else {
        callback(400, {
            error: 'you have a problem in your request',
        });
    }
};

module.exports = handler;

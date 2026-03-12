// user handler
// route handler to handler user related routes
// module scaffolding
const handler = {};

// dependencies
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilities');
const { parseJSON } = require('../../helpers/utilities');
const tokenHandler = require('./tokenHandler');

handler.userHandler = (requestProparties, callback) => {
    console.log(requestProparties);
    const acceptedMethod = ['get', 'post', 'put', 'delete'];
    if (acceptedMethod.indexOf(requestProparties.method) > -1) {
        handler._user[requestProparties.method](requestProparties, callback);
    } else {
        callback(405);
    }
};

handler._user = {};

// POST
handler._user.post = (requestProparties, callback) => {
    const firstName = typeof requestProparties.body.firstName === 'string';
    requestProparties.body.firstName.trim().length > 0 ? requestProparties.body.firstName : false;

    const lastName = typeof requestProparties.body.lastName === 'string';
    requestProparties.body.lastName.trim().length > 0 ? requestProparties.body.lastName : false;

    const phone = typeof requestProparties.body.phone === 'string';
    requestProparties.body.phone.trim().length === 11 ? requestProparties.body.phone : false;

    const password = typeof requestProparties.body.password === 'string';
    requestProparties.body.password.trim().length > 0 ? requestProparties.body.password : false;

    const tosAggrement =
        typeof requestProparties.body.tosAggrement === 'boolean'
            ? requestProparties.body.tosAggrement
            : false;

    if (firstName && lastName && phone && password && tosAggrement) {
        data.read('user', phone, (err, user) => {
            if (err) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAggrement,
                };

                data.create('user', phone, userObject, (err) => {
                    if (!err) {
                        callback(200, {
                            message: 'user created successfully',
                        });
                    } else {
                        callback(500, { error: 'unable to create user' });
                    }
                });
            }
        });
    } else {
        callback(400, {
            error: 'you have a prb in yur req',
        });
    }
};

// GET
handler._user.get = (requestProparties, callback) => {
    const phone = typeof requestProparties.queryStringObject.phone === 'string';
    requestProparties.queryStringObject.phone.trim().length === 11
        ? requestProparties.queryStringObject.phone
        : false;

    if (phone) {
        const token =
            typeof requestProparties.headersObject.token === 'string'
                ? requestProparties.headersObject.token
                : false;

        tokenHandler._token.verify(token, phone, (tokenId) => {
            if (tokenId) {
                data.read('user', phone, (err, u) => {
                    const user = { ...parseJSON(u) };

                    if (!err && user) {
                        delete user.password;
                        callback(200, user);
                    } else {
                        callback(404, {
                            error: 'request error',
                        });
                    }
                });
            } else {
                callback(403, {
                    error: 'authentication failed',
                });
            }
        });
    } else {
        callback(404, {
            error: 'requested user not found',
        });
    }
};

// PUT
handler._user.put = (requestProparties, callback) => {
    const firstName = typeof requestProparties.body.firstName === 'string';
    requestProparties.body.firstName.trim().length > 0 ? requestProparties.body.firstName : false;

    const lastName = typeof requestProparties.body.lastName === 'string';
    requestProparties.body.lastName.trim().length > 0 ? requestProparties.body.lastName : false;

    const phone = typeof requestProparties.body.phone === 'string';
    requestProparties.body.phone.trim().length === 11 ? requestProparties.body.phone : false;

    const password = typeof requestProparties.body.password === 'string';
    requestProparties.body.password.trim().length > 0 ? requestProparties.body.password : false;

    if (phone) {
        if (firstName || lastName || password) {
            const token =
                typeof requestProparties.headersObject.token === 'string'
                    ? requestProparties.headersObject.token
                    : false;

            tokenHandler._token.verify(token, phone, (tokenId) => {
                if (tokenId) {
                    data.read('user', phone, (err, uData) => {
                        const userData = { ...parseJSON(uData) };

                        if (!err && userData) {
                            if (firstName) {
                                userData.firstName = firstName;
                            }

                            if (lastName) {
                                userData.lastName = lastName;
                            }

                            if (password) {
                                userData.password = hash(password);
                            }

                            data.update('user', phone, userData, (err) => {
                                if (!err) {
                                    callback(200, {
                                        message: 'user updated successfully',
                                    });
                                } else {
                                    callback(500, {
                                        error: 'there was a problmen in server side',
                                    });
                                }
                            });
                        } else {
                            callback(400, {
                                error: 'you have a problem in your request',
                            });
                        }
                    });
                } else {
                    callback(403, {
                        error: 'authentication failed',
                    });
                }
            });
        } else {
            callback(400, {
                error: 'you have problem in your req',
            });
        }
    } else {
        callback(400, {
            error: 'invalid phone number,please try again',
        });
    }
};

// DELETE
handler._user.delete = (requestProparties, callback) => {
    const phone = typeof requestProparties.queryStringObject.phone === 'string';
    requestProparties.queryStringObject.phone.trim().length === 11
        ? requestProparties.queryStringObject.phone
        : false;

    if (phone) {
        const token =
            typeof requestProparties.headersObject.token === 'string'
                ? requestProparties.headersObject.token
                : false;

        tokenHandler._token.verify(token, phone, (tokenId) => {
            if (tokenId) {
                data.read('user', phone, (err, userData) => {
                    if (!err && userData) {
                        data.delete('user', phone, (err) => {
                            if (!err) {
                                callback(200, {
                                    error: 'user deleted successful',
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
                callback(403, {
                    error: 'authentication failed',
                });
            }
        });
    } else {
        callback(400, {
            error: 'No such data available',
        });
    }
};

module.exports = handler;

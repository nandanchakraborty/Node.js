// user handler
// route handler to handler user related routes
// module scaffolding
const handler = {};

// dependencies
const data = require('../../lib/data');
const { hash } = require('../../helpers/utilities');
const { parseJSON } = require('../../helpers/utilities');

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
handler._user.post = (requestProparties, callback) => {
    const firstName = typeof (requestProparties.body.firstName === 'string' &&
    requestProparties.body.firstName.trim().length > 0
        ? requestProparties.body.firstName
        : false);
    const lastName = typeof (requestProparties.body.lastName === 'string' &&
    requestProparties.body.lastName.trim().length > 0
        ? requestProparties.body.lastName
        : false);
    const phone = typeof (requestProparties.body.phone === 'string' &&
    requestProparties.body.phone.trim().length === 11
        ? requestProparties.body.phone
        : false);

    const password = typeof (requestProparties.body.password === 'string' &&
    requestProparties.body.password.trim().length > 0
        ? requestProparties.body.password
        : false);
    const tosAggrement = typeof (requestProparties.body.tosAggrement === 'boolean' &&
    requestProparties.body.tosAggrement.trim().length > 0
        ? requestProparties.body.tosAggrement
        : false);

    if (firstName && lastName && phone && password && tosAggrement) {
        // make sure that user doesnt exist
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
handler._user.get = (requestProparties, callback) => {
    // check if the phone number is valid or not
    const phone = typeof (requestProparties.queryStringObject.phone === 'string' &&
    requestProparties.queryStringObject.phone.trim().length === 11
        ? requestProparties.queryStringObject.phone
        : false);
    if (phone) {
        // look up the user
        data.read('user', phone, (err, u) => {
            const user = { ...parseJSON(u) };
            /*
            {name : 'jssh',age = 23,gender :'male'}
            sigle level user .spread operator use to parse
            */
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
        callback(404, {
            error: 'requested user not found',
        });
    }
};
handler._user.put = (requestProparties, callback) => {};
handler._user.delete = (requestProparties, callback) => {};
module.exports = handler;

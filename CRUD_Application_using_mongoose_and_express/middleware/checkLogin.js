const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    const { authorization } = req.headers; // must be send from headers

    try {
        const token = authorization.split(' ')[1]; // split the token from authrization header
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // decoding the token

        const { username, userId } = decoded; // getting the user name and id
        req.username = username;
        req.userId = userId;
        next();
    } catch (err) {
        console.log(err);
        next('Authentication failure');
    }
};
module.exports = checkLogin;

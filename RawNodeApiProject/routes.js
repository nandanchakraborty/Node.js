// routes
// Description : application routes
// Dependencies

const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');
const { userHandler } = require('./handlers/routeHandlers/userHandler');
const {tokenHandler } = require('./handlers/routeHandlers/tokenHandler');

const routes = {
    '': sampleHandler, // this handles '/'
    sample: sampleHandler,
    user: userHandler,
    token: tokenHandler,
};
module.exports = routes;

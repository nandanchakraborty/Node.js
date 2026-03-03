// routes
// Description : application routes
// Dependencies

const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');
const { notFoundHandler } = require('./handlers/routeHandlers/notFoundHandler');

const routes = {
    '': sampleHandler, // this handles '/'
    sample: sampleHandler,
    notFound: notFoundHandler,
};
module.exports = routes;

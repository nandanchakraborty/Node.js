// not found  handler

// module scaffolding
const handler = {};
handler.notFoundHandler = (requestProparties, callback) => {
    callback(404, {
        message: 'url not found',
    });
};
module.exports = handler;

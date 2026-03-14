// handle req res

// dependencies
const { StringDecoder } = require('string_decoder');
const url = require('url');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');
const { parseJSON } = require('./utilities');
// scafolding
const handler = {};

handler.HandleReqRes = (req, res) => {
    // req handle
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });
    const chosenHandler = routes[trimedPath] ? routes[trimedPath] : notFoundHandler;
    const requestProparties = {
        parsedUrl,
        path,
        trimedPath,
        method,
        queryStringObject,
        headersObject,
        body: realData,
    };
    req.on('end', () => {
        realData += decoder.end();
        requestProparties.body = parseJSON(realData);
        chosenHandler(requestProparties, (statusCode, payload) => {
            const finalStatusCode = typeof statusCode === 'number' ? statusCode : 500;

            const finalPayload = typeof payload === 'object' ? payload : {};

            const payloadString = JSON.stringify(finalPayload);

            res.writeHead(finalStatusCode);
            res.end(payloadString);
        });
    });
};

module.exports = handler;

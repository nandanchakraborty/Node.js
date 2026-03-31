/*
Title : workers library
Descrip : worker related library
*/
// dependencies
const url = require('url');
const http = require('http');
const https = require('https');
const data = require('./data');
const { parseJSON } = require('../helpers/utilities');

const worker = {};

// lookup all the checks

worker.gatherAllChecks = () => {
    data.list('checks', (err, checks) => {
        if (!err && checks && checks.length > 0) {
            checks.forEach((check) => {
                data.read('checks', check, (err2, originalCheckData) => {
                    if (!err2 && originalCheckData) {
                        // pass the data to the check validator

                        worker.validateCheckData(parseJSON(originalCheckData));
                    } else {
                        console.log('EEROR : reading one of the check data');
                    }
                });
            });
        } else {
            console.log('error :could not find any checks to process');
        }
    });
};

worker.validateCheckData = (originalCheckData) => {
    const originalData = originalCheckData;
    if (originalCheckData && originalCheckData.id) {
        originalData.state = typeof originalCheckData.state;
        'string'[('up', 'down')].indexOf(originalCheckData.state) > -1
            ? originalCheckData.state
            : 'down';

        originalData.lastChecked =            typeof originalCheckData.lastChecked === 'number' && originalCheckData.lastChecked > 0
                ? originalCheckData.lastChecked
                : false;

        worker.performCheck(originalData);
    } else {
        console.log('error : check was invalid or not properly formatted');
    }
};

worker.performCheck = (originalCheckData) => {
    // prepare the check outcome
    
    // parse the hostname and full url from original data
    const parsedUrl = url.parse(`${originalCheckData.protocol}:// ${originalCheckData.url}`, true);
    const { hostname } = parsedUrl;
    const { path } = parsedUrl;

    // constract the req

    const requestDetails = {
        protocol: `${originalCheckData.protocol}:`,
        hostname,
        method: originalCheckData.method.toUpperCase(),
        path,
        timeout: originalCheckData.timeoutSecond * 1000,
    };
    const protocolToUse = originalCheckData.protocol === 'http' ? http : https;
    const req = protocolToUse.request(requestDetails, (res) => {
        // grab the status of the response

        const status = res.statusCode;

        // update the check outcome and pass to the next process
    });
    req.on('error',(e) =>{

    })

      req.on('timeout',(e) =>{
        
    })


    // req send
    req.end();
};

// timer to execute the worker process once per minute
worker.loop = () => {
    setInterval(() => {
        worker.gatherAllChecks();
    }, 1000 * 60);
};

worker.init = () => {
    // start the workser
    worker.gatherAllChecks();
    // call the loop so that checks continue

    worker.loop();
};

module.exports = worker;

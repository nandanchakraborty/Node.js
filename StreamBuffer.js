// creating a stream to read big txt files

const fs = require('fs');

const ourReadStream = fs.createReadStream(`${__dirname}/bitdata.txt`, 'utf8');

ourReadStream.on('data', (chunk) => {
    console.log(chunk);
});

// when the req comes ,the req comes as stream to see it or read stream
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('<html><head><title>Form</title></head>');
        res.write(
            '<body><form method="post" action="/process"><input name="message" /></form></body>'
        );
        res.end();
    } else if (req.url === '/process' && req.method === 'POST') {
        req.on('data', (chunk) => {
            console.log(chunk); // or toString
        });
        res.write('thanks for submitting');
        res.end();
    } else {
        res.write('not found');
        res.end();
    }
});

server.listen(3000); // port number

console.log('listing on server 3000');

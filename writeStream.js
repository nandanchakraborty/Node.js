const fs = require('fs');

const ourReadStream = fs.createReadStream(`${__dirname}/bitdata.txt`);
const ourWriteStream = fs.createWriteStream(`${__dirname}/output.txt`);

// ourReadStream.on('data', (chunk) => {
//   ourWriteStream.write(chunk);
// });

// pipe : same task using pipe

ourReadStream.pipe(ourWriteStream);

// both read and write stream

const http = require('http');

const server = http.createServer((req, res) => {
    const myReadStream = fs.createReadStream(`${__dirname}/bitdata.txt`, 'utf8');
    myReadStream.pipe(res);
});

server.listen(3000); // port number

console.log('listing on server 3000');

/* In Node.js:

✔ Request (req) = Readable Stream
✔ Response (res) = Writable Stream
*/

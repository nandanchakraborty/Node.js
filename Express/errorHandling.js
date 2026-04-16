const express = require('express');
const fs = require('fs');

const app = express();
// asynchronus processs error handling

app.post('/', (req, res, next) => {
    fs.readFile('/file_does_not_exist', (err, data) => {
        if (err) {
            next(err);
        } else {
            res.send(data);
        }
    });
});

// all this are synchronus process error handling
app.get('/', (req, res) => {
    for (let i = 0; i <= 10; i += 1) {
        if (i === 5) {
            next('there was an error');
        } else {
            res.write('a');
        }
    }
    res.end();
});

app.use((req, res, next) => {
    //  res.send('Requested url was not found'); // can be send to next middleware by using next
    next('Requested url was not found');
});

app.use((err, req, res, next) => {
    // this error handling middleware must be last middleware in an synchronas process
    if (res.headersSent) {
        next('there was a problmen');
    } else if (err.message) {
        res.status(500).send(err.message);
    } else {
        res.status(200).send('there was an error');
    }
});

// after the custom error handler ,express default handler is here

app.listen(3000, () => {
    console.log('listening on port 3000');
});

/*
IMPORTANT NOTES ABOUT ERROR HANDLING AND MIDDLEWARE Documentation:

1.Errors that occur in synchronous code inside
 route handlers and middleware require no extra work. If synchronous code
throws an error, then Express will catch and process it. For example:

app.get('/', (req, res) => {
  throw new Error('BROKEN') // Express will catch this on its own.
})

2.For errors returned from asynchronous functions
invoked by route handlers and middleware, you must
 pass them to the next() function, where Express will catch and process them. For example:

app.get('/', (req, res, next) => {
  fs.readFile('/file-does-not-exist', (err, data) => {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})

*/

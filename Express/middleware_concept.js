// functions that have acccess to req and res and next function

// types of middleware 1.application level,2.router level,3.error handling ,4.builtin ,4.third-party

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser()); // here it used as middleware

app.use(express.json()); // its a builtin middleware
const adminRouter = express.Router();

const logger = (req, res, next) => {
    console.log(
        `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol}-${req.ip}`
    );

    // next(); // can use res.end() here without calling next() to end req
    throw new Error('this is an error'); // making the error handling middleware and it must be catch
};

adminRouter.use(logger); // here logger is used as router level middleware

adminRouter.get('/dashboard', (req, res) => {
    res.send('dashboard');
});

app.use('/admin', adminRouter);

// app.use(logger);  // here using it in application level.

app.get('/about', (req, res) => {
    res.send('about');
});

const errorMiddleware = (err, req, res, next) => {
    // catching the throwing middleware error and must use 4 parameter
    console.log(err);
    res.status(500).send('there was a server side error');
};
adminRouter.use(errorMiddleware);

app.listen(3000, () => {
    console.log('listening on port 3000');
});

// middleware that takes data  is called modified middleware

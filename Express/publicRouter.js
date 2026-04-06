const express = require('express');

const publicRouter = express.Router();

// making a middleware that can response in all method

publicRouter
    .route('/user')
    .all((req, res, next) => {
        console.log('I am looging something');
        next();
    })
    .get((req, res) => {
        res.send('get');
    })
    .post((req, res) => {
        res.send('post');
    })
    .put((req, res) => {
        res.send('put');
    })
    .delete((req, res) => {
        res.send('get');
    });

// publicRouter.all('*', log);

// normal routes
/*
publicRouter.get('/', (req, res) => {
    res.send('home');
});

publicRouter.get('/about', (req, res) => {
    res.send('about');
});
 all these can be written in a signle way not separate way
*/
module.exports = publicRouter;

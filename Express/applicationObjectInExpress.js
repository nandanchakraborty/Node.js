// whenever we call app = express() we got an object ,lets see which method and
// properties it contains

// route method

const express = require('express');

const app = express();

app.route('/about/mission')
    .get((req, res) => {
        res.send('welcome to application home get');
    })
    .post((req, res) => {
        res.send('welcome to application home post');
    })
    .put((req, res) => {
        res.send('welcome to application home put');
    });

app.listen(3000, () => {
    console.log('listing on port 3000');
});

/*
Express.js: Template Engine & Route Params
1. Template Engine
Definition: A template engine is used to generate dynamic HTML
 by combining templates with data.
Why use it: Cleaner code, separation of concerns,
 dynamic UI.
Example: res.render('home', { name: 'Nandan' })
2. Route Parameters (req.params)
Definition: Route parameters are dynamic values in the URL.
Example: /user/:id
Access using: req.params.id
3. Example
app.get('/user/:name', (req, res) => { res.render('profile', { name: req.params.name }); });
Summary
Template Engine = dynamic HTML generation
Route Params = extract values from URL

*/

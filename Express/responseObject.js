const express = require('express');

const app = express();

app.set('view engine', 'ejs'); // for res.locals

app.get('/about', (req, res) => {
    // res.locals
    console.log(res.headersSent);
    res.render('pages/about', {
        name: 'Bangladesh',
    });
    res.format({
        'text/plain': () => {
            res.send('hi');
        },

        'application/json': () => {
            res.json({
                message: 'about',
            });
        },
        default: () => {
            res.status(406).send('not acceptable');
        },
    });
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});

// methods
// 1.res.end() -- withoud data to end response
// 2, res.json()-- send a header a application json and
// 3. res.status() --status code  or res.sendStatus()
// 4.res.format() --
// 5.res.cookie()
// 6.res.location

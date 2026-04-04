const express = require('express');

const app = express();
app.use(express.json());

// sub app
const adminRoute = express.Router();
// properties
adminRoute.get('/dashboard', (req, res) => {
    console.log(req.baseUrl);
    console.log(req.url); // sub app e req.url changed hobe
    console.log(req.originalUrl);
    console.log(req.path);
    console.log(req.hostname);
    console.log(req.secure);
    res.send('we are in  admin dashboard');
});
app.use('/admin', adminRoute); // kono ekta route je sub app e mount hobe  shei sub app er base path ta hbe base url

app.get('/user/:id', (req, res) => {
    console.log(req.baseUrl);
    console.log(req.path);
    console.log(req.hostname);
    console.log(req.method);
    console.log(req.params);
    res.send('hello world');
});
app.post('/user', (req, res) => {
    console.log(req.body);
    console.log(req.route);
});
app.listen(3000, () => {
    console.log('listening on port 3K');
});
// methods
// *accept - what kind of data will accept like html json or others

// router object in express
// router is a thing that express give us to control the route
const express = require('express');
const adminRouter = require('./adminRouter'); // importing admin router
const publicRouter = require('./publicRouter'); // importing admin router

const app = express();

app.use('/admin', adminRouter); // whernever someone use /admin then admin router will started
app.use('/admin', publicRouter); // whernever someone use /admin then admin router will started

app.listen(3000, () => {
    console.log('listening on port 3000');
});

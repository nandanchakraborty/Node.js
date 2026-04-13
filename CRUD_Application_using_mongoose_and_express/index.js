const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler')

const app = express();


app.use(express.json());

// database connection with mongoose

mongoose
    .connect('mongodb://localhost/todos') // mongodb connection string
    .then(() => console.log('connection successful'))
    .catch((err) => console.log(err));

function errorHandler(err, req, res, next) {
    if (res.headersent) {
        return next(err);
    }
app.use('/todo',todoHandler)

    res.status(500).json({ error: err });
}

app.listen(3000, () => {
    console.log('app listening at port 3000');
});

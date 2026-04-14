const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler');

const app = express();

app.use(express.json());

app.use('/todo', todoHandler);

// database connection
mongoose
    .connect('mongodb://localhost:27017/todos')
    .then(() => console.log('connection successful'))
    .catch((err) => console.log(err));

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err.message });
}

// optional but good practice
app.use(errorHandler);

app.listen(3000, () => {
    console.log('app listening at port 3000');
});

// starting mongodbs : docker exec -it mongodb mongosh

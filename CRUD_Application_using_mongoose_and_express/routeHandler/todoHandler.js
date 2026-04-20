const express = require('express');
const mongoose = require('mongoose');
const checkLogin = require('../middleware/checkLogin');

const router = express.Router();
const todoSchema = require('../schema/todoSchema');
const userSchema = require('../schema/userSchema');

const Todo = new mongoose.model('Todo', todoSchema);
const User = new mongoose.model('User', userSchema);
// to make ODM ,u have to make a schema then ,create a model,
// named it in singular form and pass the schema

// get all the todo

router.get('/', checkLogin, async (req, res) => {
    // created a middleware to authenticate this route named : checklogin
    try {
        const data = await Todo.find({}).populate('user'); // mergeing with user collection to get user details using populate('column name(in todos), 'param1 param2')

        // console.log(data);
        res.status(200).json({
            data,
            message: 'todos fetched successfully',
        });
    } catch (err) {
        console.log('FULL ERROR:', err); // 👈 see everything
        res.status(500).json({
            message: err.message,
        });
    }
});
// get active todos from instance method
router.get('/active', async (req, res) => {
    try {
        const todo = new Todo(); // model ke diye document banano
        const data = await todo.findActive(); // oi document diye instance method ke call deoa
        res.status(200).json({
            data,
        });
    } catch (err) {
        console.log(err);
    }
});
// find by ex by static method.
router.get('/ex', async (req, res) => {
    try {
        const data = await Todo.findByExp();
        res.status(200).json({
            data,
        });
    } catch (err) {
        console.log(err);
    }
});
// find by langulage in query helper
router.get('/langulage', async (req, res) => {
    try {
        const data = await Todo.find().byLanguage('Mongoose');
        res.status(200).json({
            data,
        });
    } catch (err) {
        console.log(err);
    }
});

// get a todo by id

router.get('/:id', async (req, res) => {
    try {
        const data = await Todo.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    status: 'active',
                },
            },
        );
        console.log(data);
        res.status(200).json({
            message: 'todo fetched successfully',
        });
    } catch (err) {
        console.log('FULL ERROR:', err); // 👈 see everything
        res.status(500).json({
            error: err.message,
        });
    }
});

router.post('/', checkLogin, async (req, res) => {
    const newTodo = new Todo({
        // making relational data with todos and userid,
        ...req.body,
        user: req.userId, // getting the userid from decoded checklogin
    });
    try {
        // console.log(req.userId);
        const todo = await newTodo.save();
        await User.updateOne(
            {
                _id: req.userId,
            },
            {
                $push: { todos: todo._id },
            },
        );

        res.status(200).json({
            message: 'todo inserted successfully',
        });
    } catch (err) {
        console.log('FULL ERROR:', err); // 👈 see everything
        res.status(500).json({
            error: err.message,
        });
    }
});

router.post('/all', async (req, res) => {
    try {
        await Todo.insertMany(req.body);
        res.status(200).json({
            message: 'todos inserted successfully',
        });
    } catch (err) {
        console.log('FULL ERROR:', err); // 👈 see everything
        res.status(500).json({
            error: err.message,
        });
    }
});

// put  a todo by id

router.put('/:id', async (req, res) => {
    try {
        await Todo.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    status: 'active',
                },
            }
        );
        res.status(200).json({
            message: 'todo updated successfully',
        });
    } catch (err) {
        console.log('FULL ERROR:', err); // 👈 see everything
        res.status(500).json({
            error: err.message,
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Todo.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: 'todo delete successfully',
        });
    } catch (err) {
        console.log('FULL ERROR:', err); // 👈 see everything
        res.status(500).json({
            error: err.message,
        });
    }
});

module.exports = router;

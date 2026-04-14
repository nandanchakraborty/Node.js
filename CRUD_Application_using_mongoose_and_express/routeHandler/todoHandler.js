const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const todoSchema = require('../schema/todoSchema');

const Todo = new mongoose.model('Todo', todoSchema);
// to make ODM ,u have to make a schema then ,create a model,
// named it in singular form and pass the schema

// get all the todo

router.get('/', async (req, res) => {
    try {
        const data = await Todo.find({ status: 'active' });

        console.log(data);
        res.status(200).json({
            message: 'todos fetched successfully',
        });
    } catch (err) {
        console.log('FULL ERROR:', err); // 👈 see everything
        res.status(500).json({
            error: err.message,
        });
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

router.post('/', async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();

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

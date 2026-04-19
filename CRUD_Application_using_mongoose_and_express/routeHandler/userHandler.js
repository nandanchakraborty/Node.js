const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const userSchema = require('../schema/userSchema');

const User = new mongoose.model('User', userSchema);
// to make ODM ,u have to make a schema then ,create a model,
// named it in singular form and pass the schema

// signup route

router.post('/signup', async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashPassword,
        });
        await newUser.save();

        res.status(200).json({
            message: 'signup successfully',
        });
    } catch (err) {
        console.log('FULL ERROR:', err); // 👈 see everything
        res.status(500).json({
            error: err.message,
        });
    }
});
router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username });
        if (user && user.length > 0) {
            const isValidpass = await bcrypt.compare(req.body.password, user[0].password);
            if (isValidpass) {
                // now the user has valid password ,need to give a jwt token
                // generate token
                const token = jwt.sign(
                    {
                        username: user[0].username,
                        userid: user[0]._id,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '1h',
                    },
                );
                res.status(200).json({
                    acces_token: token,
                    message: 'login successfull',
                });
            } else {
                res.status(401).json({
                    error: 'authentication failed',
                });
            }
        } else {
            res.status(401).json({
                error: 'authentication failed',
            });
        }
    } catch (err) {
        console.log('FULL ERROR:', err); // 👈 see everything
        res.status(401).json({
            error: err.message,
        });
    }
});

module.exports = router;

import asyncHandler from 'express-async-handler'

import User from "../models/user.model.js"

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
}

export const addUser = async (req, res) => {
    try {
        const username = req.body.username;
        const newUser = new User({ username })

        await newUser.save()
        res.json('User added!')
    } catch(err) {
        res.status(400).json('Error: ' + err);
    }
}

// @desc Authenticate user & get token
// @route POST /api/users/auth
// @access Public

export const authUSer = asyncHandler(async (req, res) => {
    res.send('auth user');
})

// @desc Register a new user
// @Route POST /api/users
// @access Public

export const registerUser = asyncHandler(async (req, res) => {
    res.send('register user')
})
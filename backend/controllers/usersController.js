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


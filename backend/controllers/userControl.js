const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const validator = require("validator")
/* Create json web token */
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "1h" })
}
/* Get All user */
const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
    }
    if (!users) {
        return res.status(404).json({ message: "No Users Found" })
    }
    return res.status(200).json(users)
}
/* User Signup */
const userSignup = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Please enter a email! " })
    }
    if (!password) {
        return res.status(400).json({ message: "Please enter a password " })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Please enter a valid email " })
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Please enter a strong password! (Uppercase,lowercase,numbers and characters!)" })
    }
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists!' });
    }
    // Corrected bcrypt.hashSync with a salt round
    const saltRounds = 6; // You can adjust this according to your needs
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const user = new User({
        email,
        password: hashedPassword,
    });
    const token = createToken(user._id)
    try {
        await user.save();
        return res.status(200).json({ message: 'Signup successful', email, password,token });
        /* return res.status(200).json({user, token}); */
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

/* Login */
const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Please enter a user email! " })
    }
    if (!password) {
        return res.status(400).json({ message: "Please enter a user password!" })
    }
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (!existingUser) {
        return res.status(404).json({ message: 'Could not find user with this email' });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Incorrect Password' });
    }
    const token = createToken(existingUser._id)
    return res.status(200).json({ message: 'Login successful', email, password,token });
};

module.exports = {
    getAllUsers,
    userSignup,
    userLogin
};

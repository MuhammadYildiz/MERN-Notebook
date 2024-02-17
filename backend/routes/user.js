const express = require('express');
const router = express.Router();
const { getAllUsers,userLogin,userSignup } = require('../controllers/userControl');
router.get('/', getAllUsers);
router.post("/login",userLogin)
router.post("/signup",userSignup)
module.exports = router;
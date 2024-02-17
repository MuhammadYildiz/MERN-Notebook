const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js")
const authControl =  async (req, res, next)=>{
    const {authorization} =  req.headers;
    if(!authorization){
        return res.status(401).json({message: "''Authorization token'' is required"})
    }
    const token = authorization.split(' ')[1];
    try {
        const {_id} = jwt.verify(token,process.env.SECRET_KEY)
        req.User = User.findOne({_id}).select('_id')
        next()
    } catch (error) {
        console.log(err);
        return res.status(401).json({message: "The request is not authorized"})
    }
}
module.exports = authControl
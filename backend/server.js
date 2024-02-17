const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const  noteRouter  = require('./routes/notes');
const userRouter =require("./routes/user")
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors())
app.use('/', (req, res, next) => {
    console.log(req.path, req.method);
    next()
})
app.use("/api/user",userRouter)
app.use("/api/notes",noteRouter)
mongoose.connect(process.env.MongoDB_URL)
    .then(() => {
        console.log("project connected with MongoDB database")
        app.listen(process.env.PORT, () => {
            console.log("Project working on Port " + process.env.PORT);
        })
    })
    .catch((err) => console.log(err))



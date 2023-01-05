require('dotenv').config;
const path = require('path')
const express = require("express");
const cors = require('cors')
const app = express();
PORT = 5000
// PORT = 8002
const {connectDb} = require("./db/connectDb");
const router = require("./routes/router");



connectDb();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use(router);


// Set static folder up in production deployment
// app.use(express.static(path.json(__dirname, "../frontend/build")));

// app.get("*", (req, res) =>{
//     res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
// });
// console.log(__dirname);

app.listen(PORT, ()=>{
    console.log("my server running on this port: ", PORT)
});
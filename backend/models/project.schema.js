const mongoose = require('mongoose');

const myProjectSchema = new mongoose.Schema({
    name: String,
    email:String,
    password:String
})
module.exports = mongoose.model("users_input", myProjectSchema);
const mongoose = require("mongoose");

const dataStoreScheme = new mongoose.Schema({
     name: String,
     price: String,
     category: String,
     userId:String,
     company:String
});
module.exports= mongoose.model("datastore", dataStoreScheme)
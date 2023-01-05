const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

// const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/MyProject";

const connectDb = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        // await mongoose.connect("mongodb://localhost:27017/MyProject");
        console.log("Database connected Successfully");
    } catch (error) {
        console.log("there is some issues to connecting to DB", error);
    }
}
module.exports = {connectDb};
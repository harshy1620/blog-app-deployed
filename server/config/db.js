const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to Mongodb Database ${mongoose.connection.host}`.bgMagenta.white);
  }

   catch (error) {
    console.log(`MONGO connect Error ${error}`.bgRed.white);
  }
};


module.exports = connectDB;

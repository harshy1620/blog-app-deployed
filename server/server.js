const express = require("express");
const app = express();
const cors= require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv=require("dotenv");
const connectDB = require("./config/db");

//env congig
dotenv.config();


//mongodb connect
connectDB();

//middlewares
app.use(cors({
    origin: "",
    methods:["POST","GET","DELETE","PUT"],
    credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

//routes
// specific route for user
app.use("/api/v1/user", require("./routes/userRoutes"));
// specific route for blogs
app.use("/api/v1/blog", require("./routes/blogRoutes"));



//port
const PORT=process.env.PORT || 8080

//listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.bgCyan.white));
const express = require("express");
//router object
const router = express.Router();

const { getAllUsers, registerController, loginController } = require("../controllers/userController");


// const { registerUser,authUser,allUsers } = require("../controllers/userController");
// const { protect } = require("../middleware/authMiddleware");


//routes 
//get all users || GEt
router.get("/all-users", getAllUsers);

//create user || POST
router.post("/register",registerController);

//login || POST
router.post("/login", loginController);




module.exports = router;
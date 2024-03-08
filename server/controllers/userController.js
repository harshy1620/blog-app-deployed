const UserModel = require("../models/userModel");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//register
module.exports.registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.send({
        message: "Please Fill all Fields",
        success: false,
      });
    } else {
      // check if user is already registered
      const existinguser = await UserModel.findOne({ email });
      if (existinguser) {
        return res.send({
          message: "user already registered",
          success: false,
        });
      }
      //if not registered,save new user
      else {
        //hashing the pass using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new UserModel({ name, email, password: hashedPassword });
        await user.save();
        return res.send({
          message: "New user registered sucessfully",
          success: true,
          user,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error In Register callback",
      success: false,
      error: error.message, // or use the shorthand syntax: error
    });
  }
};

//login
module.exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "User not found,please register first",
      });
    }
    //password matching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send({
        success: false,
        message: "Invlid username or password",
      });
    }
    return res.send({
      success: true,
      message: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error In Login Callback",
      error,
    });
  }
};

//get all users
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    return res.send({
      userCount: users.length,
      success: true,
      message: "all users data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error In Getting All Users",
      error,
    });
  }
};

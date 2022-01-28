const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userDatabase = require("../model/user");

exports.signUp = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  try {
    const userExist = await userDatabase.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({
        status: "ERROR",
        message: "Email already exists!",
      });
    } else {
      const hash = await bcrypt.hash(password, 12);
      if (!hash) {
        return res.status(500).json({
          status: "ERROR",
          message: "Password cannot be created!",
        });
      } else {
        const newUser = new userDatabase({ name, email, password: hash });
        const token = jwt.sign(
          { name: name, email: email, _id: newUser },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        newUser.save().then(() => {
          return res.status(200).json({
            status: "SUCCESS",
            message: `User ${email} created successfully!`,
            id: newUser._id,
            token: token,
          });
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      status: "ERROR",
      message: "Something went in SignUp process!",
    });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userDatabase.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        status: "ERROR",
        message: "No such user Exist!",
      });
    } else {
      bcrypt.compare(password, user.password, (error, result) => {
        if (!result) {
          return res.status(500).json({
            status: "ERROR",
            message: "Incorrect password",
          });
        } else {
          const token = jwt.sign(
            { name: user.name, email: email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            status: "SUCCESS",
            message: "Signed in successfully",
            payload: {
              name: user.name,
              email: user.email,
              _id: user._id,
              token: token,
            },
          });
        }
      });
    }
  } catch (Error) {
    return res.status(500).json({
      status: "ERROR",
      message: "Something went in signIn process!",
    });
  }
};

exports.userInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const userInfo = await userDatabase.findById(id).populate("blog");
    if (!userInfo) {
      throw new Error({
        status: "ERROR",
        message: "Something went wrong when trying to fetch user information!",
      });
    }
    const { name, blog } = userInfo;
    return res.status(200).json({
      status: "SUCCESS",
      message: "Sucessfully fetched user information!",
      payload: { name, blog },
    });
  } catch (err) {
    return res.status(500).json({
      status: "ERROR",
      message: "SOmething went wrong in fetching user information!",
    });
  }
};

exports.users = async (req, res) => {
  try {
    userDatabase.find({}, (error, users) => {
      if (error) {
        res.status(500).json({
          status: "ERROR",
          message: "Unable to find users information!",
        });
      } else {
        res.status(200).json({
          status: "SUCCESS",
          payload: users.map((user) => ({
            name: user.name,
            _id: user._id,
          })),
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

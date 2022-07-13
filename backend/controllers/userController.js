const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc    Get all user data
// @route   GET /api/users/
// @access  Public
const findAll = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @desc    Forget Password
// @route   POST /api/users/forgetPassword
// @access  Public
const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email required");
  }

  const token = crypto.randomBytes(20).toString("hex");
  const user = await User.findOneAndUpdate(
    { email: email },
    {
      $set: {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
    }
  );

  if (!user) {
    res.status(400);
    throw new Error("User with this email does not exist");
  } else {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      service: "gmail",
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });

    const mailOptions = {
      from: `${process.env.EMAIL_ADDRESS}`,
      to: `${user.email}`,
      subject: "Link To Reset Password",
      text:
        "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
        `http://localhost:3000/api/users/reset/${token}\n\n` +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n",
    };

    console.log("sending mail");

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error("there was an error: ", err);
      } else {
        console.log("here is the res: ", response);
        res.status(200).json("recovery email sent");
      }
    });
  }
});

// @desc    Authenticate reset password
// @route   POST /api/users/reset/:token
// @access  Public
const authenticateResetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    console.log("password reset link is invalid or has expired");
    res.status(400).send("password reset link is invalid or has expired");
  } else {
    console.log("password reset link authenticated");
    res.status(200).send({ data: user });
  }
});

// @desc    Update Password
// @route   PATCH /api/users/updatePasswordViaEmail
// @access  Public
const updatePassword = asyncHandler(async (req, res) => {
  const { userId, password, password2 } = req.body;

  if (!password || !password2) {
    res.status(400);
    throw new Error("Please fill in all fields");
  } else {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user with new password
    const updatedUser = await User.findByIdAndUpdate(userId, {
      password: hashedPassword,
    });

    if (!updatedUser) {
      res.status(400);
      throw new Error("User is not found in database");
    } else {
      res.status(200).send({ data: updatedUser });
    }
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  findAll,
  forgetPassword,
  authenticateResetPassword,
  updatePassword,
};

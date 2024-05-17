const uuid = require("uuid");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

// const DUMMY_USERS = [
//   {
//     id: "u1",
//     name: "sai",
//     email: "sai@gmail.com",
//     password: "success",
//   },
// ];

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(new HttpError("Fetching users failed, try again.", 500));
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs.", 422));
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signup failed.", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "email is already registered, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Could not create user, please try again", 500);
    return next(error);
  }
  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    image: req.file.path,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("SigningUp user failed, try again.", 500);
    return next(error);
  }

  let token;
  try{
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  }
  catch(err){
    const error = new HttpError("Signing up failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again", 500);
    return next(error);
  }

  if (!existingUser) {
    return next(
      new HttpError("Credentials invalid, could not log you in.", 401)
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    return next(
      new HttpError("Credentials invalid, could not log you in.", 401)
    );
  }

  let token;
  try{
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  }
  catch(err){
    const error = new HttpError("Logging in failed, please try again", 501);
    return next(error);
  }

  res.json({ userId: existingUser.id, email: existingUser.email, token: token });
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;

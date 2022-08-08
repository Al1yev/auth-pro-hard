const User = require("../model/userModel");
const AppError = require("../utility/appError");
const catchErrorAsync = require("../utility/catchErrorAsync");
const resFunc = require("../utility/resFunc");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper functions

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const saveTokenCookie = (token, res, req) => {
  res.cookie("jwt", token, {
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: req.protocol === "https" ? true : false,
  });
};

// Middlewares

const roleChecker = (roles) => {
  return catchErrorAsync(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You have not access to do it!", 401));
    }
    next();
  });
};

const protect = catchErrorAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError("Please log in!", 404));
  }

  const compareToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(compareToken.id);

  if (!user) {
    return next(new AppError("User is not found when authorization!", 401));
  }

  if (user.passwordChangedDate) {
    console.log(user.passwordChangedDate.getTime() / 1000);
    console.log(compareToken.iat);
    if (user.passwordChangedDate.getTime() / 1000 > compareToken.iat) {
      return next(
        new AppError("Your token is not accessed! Please log in!", 401)
      );
    }
  }

  req.user = user;
  res.locals.user = user;
  next();
});

// Main Functions

const signUp = catchErrorAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
    team: req.body.team,
  });
  const token = createToken(newUser._id);
  saveTokenCookie(token, res, req);
  resFunc(res, 201, "Success", newUser, token);
});

const signIn = catchErrorAsync(async (req, res, next) => {
  const { email, password } = { ...req.body };

  if (!email || !password)
    return next(new AppError("Password or Login isn't entered!", 404));

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new AppError("User isn't found!", 404));

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) return next(new AppError("Password is wrong!", 404));

  const token = createToken(user._id);
  saveTokenCookie(token, res, req);

  resFunc(res, 200, "Successfully logged in", {}, token);
});

module.exports = {
  roleChecker,
  protect,
  signIn,
  signUp,
};

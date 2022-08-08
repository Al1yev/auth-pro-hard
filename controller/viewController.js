const User = require("../model/userModel");
const AppError = require("../utility/appError");
const catchErrorAsync = require("../utility/catchErrorAsync");

const renderAllUsers = catchErrorAsync(async (req, res, next) => {
  const data = await User.find();
  console.log(data);
  res.status(200).render("overview", { data });
});

const renderSignUp = (req, res, next) => {
  res.status(200).render("signUp");
};

const renderSignIn = (req, res, next) => {
  res.status(200).render("signIn");
};

module.exports = {
  renderAllUsers,
  renderSignUp,
  renderSignIn,
};

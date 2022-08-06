const User = require("../model/userModel");
const handlerController = require("./handlerController");

const getAllUser = (req, res, next) => {
  handlerController.getAllData(req, res, next, User);
};

const getOneUser = (req, res, next) => {
  handlerController.getOneData(req, res, next, User);
};

const createNewUser = (req, res, next) => {
  handlerController.createData(req, res, next, User);
};

const updateUser = (req, res, next) => {
  handlerController.updateData(req, res, next, User);
};

const deleteUser = (req, res, next) => {
  handlerController.deleteData(req, res, next, User);
};

module.exports = {
  getAllUser,
  getOneUser,
  createNewUser,
  updateUser,
  deleteUser,
};

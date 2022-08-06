const catchErrorAsync = require("../utility/catchErrorAsyncModel");
const AppError = require("../utility/appError");
const resFunc = require("../utility/resJson.js");

const getAllData = catchErrorAsync(async (req, res, next, Model) => {
  const data = await Model.find();
  if (!data) return next(new AppError(`${Model} isn't found !`));
  resFunc(res, 200, "Success", data);
});

const getOneData = catchErrorAsync(async (req, res, next, Model) => {
  const data = await Model.findById({ _id: req.params.id });
  if (!data) return next(new AppError(`${Model} isn't found !`));
  resFunc(res, 200, "Success", data);
});

const updateData = catchErrorAsync(async (req, res, next, Model) => {
  const data = await Model.findByIdAndUpdate({ _id: req.params.id }, req.body);
  if (!data) return next(new AppError(`${Model} isn't found !`));
  resFunc(res, 202, "Success", data);
});

const createData = catchErrorAsync(async (req, res, next, Model) => {
  const data = await Model.create(req.body);
  if (!data) return next(new AppError(`${Model} isn't created !`));
  resFunc(res, 201, "Success", data);
});

const deleteData = catchErrorAsync(async (req, res, next, Model) => {
  const data = await Model.findByIdAndDelete({ _id: req.params.id });
  if (!data) return next(new AppError(`${Model} isn't found !`));
  resFunc(res, 200, "Success", data);
});

module.exports = {
  getAllData,
  getOneData,
  createData,
  updateData,
  deleteData,
};

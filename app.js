const express = require("express");
const app = express();
const morgan = require("morgan");

const userRouter = require("./router/userRouter");

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/users", userRouter);

module.exports = app;

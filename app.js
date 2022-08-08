const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");

const userRouter = require("./router/userRouter");
const viewRouter = require("./router/viewRouter");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/api/v1/users", userRouter);
app.use("/", viewRouter);

module.exports = app;

const app = require("./app.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

mongoose
  .connect(
    process.env.DB_LINK.replace("<password>", process.env.DB_PASSWORD),
    {}
  )
  .then(() => {
    console.log("DB is connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(
  (PORT = process.env.PORT),
  (SERVER_URL = process.env.SERVER_URL),
  (err) => {
    if (err) console.log(err);
    else console.log(`Server is running ${SERVER_URL}:${PORT}`);
  }
);

const userController = require("../controller/userController");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createNewUser);

router
  .route("/:id")
  .get(userController.getOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;

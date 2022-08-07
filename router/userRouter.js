const userController = require("../controller/userController");
const authController = require("../controller/authController");
const express = require("express");
const router = express.Router();

router.route("/signin").post(authController.signIn);
router.route("/signup").post(authController.signUp);

router
  .route("/")
  .get(authController.protect, userController.getAllUser)
  .post(authController.protect, userController.createNewUser);

router
  .route("/:id")
  .get(authController.protect, userController.getOneUser)
  .patch(authController.protect, userController.updateUser)
  .delete(authController.protect, userController.deleteUser);

module.exports = router;

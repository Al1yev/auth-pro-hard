const userController = require("../controller/userController");
const authController = require("../controller/authController");
const express = require("express");
const router = express.Router();

router.route("/signin").post(authController.signIn);
router.route("/signup").post(authController.signUp);

router
  .route("/")
  .get(
    authController.protect,
    authController.roleChecker(["admin"]),
    userController.getAllUser
  )
  .post(
    authController.protect,
    authController.roleChecker(["admin"]),
    userController.createNewUser
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.roleChecker(["admin"]),
    userController.getOneUser
  )
  .patch(
    authController.protect,
    authController.roleChecker(["admin"]),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.roleChecker(["admin"]),
    userController.deleteUser
  );

module.exports = router;

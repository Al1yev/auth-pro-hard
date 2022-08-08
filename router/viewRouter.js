const express = require("express");
const router = express.Router();
const viewController = require("../controller/viewController");

router.route("/overview").get(viewController.renderAllUsers);
router.route("/signin").get(viewController.renderSignIn);
router.route("/signup").get(viewController.renderSignUp);

module.exports = router;

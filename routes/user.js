const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controllers/users.js");


router.route("/signup")
.get( userController.renderSignUpForm)
.post(wrapAsync(userController.singUp));

router.route("/login")
.get( userController.renderSignInForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }), userController.login);

    
router.get("/logout",userController.logOut)

module.exports = router;

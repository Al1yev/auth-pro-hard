const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    utility: true,
  },
  image: {
    type: String,
    default: "profil.jfif",
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please enter your confirm password!"],
    select: false,
  },
  role: {
    type: String,
    required: false,
    enum: ["admin", "user"],
    default: "user",
  },
  team: {
    type: String,
    required: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hashPassword = await bcrypt.hash(this.password, 12);
  this.password = hashPassword;
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;

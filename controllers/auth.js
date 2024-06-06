const { error } = require("console");
const User = require("../models/User");

async function HandleUserSignUp(req, res, next) {
  const { Username, Email, Password } = req.body;
  const NewUser = await User.create({
    Username,
    Email,
    Password,
  });
  res.redirect("/Login");
}

async function HandleUserLogin(req, res, next) {
  const { Email, Password } = req.body;
  try {
    const token = await User.MatchingPassword(Email, Password);
    if (!token) {
      return res.render("log_in", { error: "Invalid Email or Password" });
    }
    res.cookie("token", token);
    return res.redirect("/Home");
  } catch (error) {
    console.error("Login Error:", error);
    return res.render("log_in", { error: "Invalid Email or Password" });
  }
}

async function LogoutUser(req, res, next) {
  res.clearCookie("token");
  res.redirect("/");
}
module.exports = {
  HandleUserLogin,
  HandleUserSignUp,
  LogoutUser,
};

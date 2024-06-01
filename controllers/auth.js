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
    res.cookie("token", token);
    return res.redirect("/Blog");
  } catch (error) {
    res.render("log_in", { error: "Invalid Email or Password" });
  }
}

module.exports = {
  HandleUserLogin,
  HandleUserSignUp,
};

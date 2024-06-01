const User = require("../models/User.js");
const { ValidateToken } = require("../controllers/session.js");

async function IsLoggedIn(req, res, next) {
  const CookieToken = req.cookies?.token;
  if (!CookieToken) {
    res.redirect("/Login");
  }
  const UserData = ValidateToken(CookieToken);
  console.log(UserData);
  if (!UserData) {
    res.redirect("/Login");
  }
  const CurrentUser = await User.findById(UserData.id);
  req.user = CurrentUser;
  next();
}

async function CheckTokenForLogin(req, res, next) {
  const CookieToken = req.cookies?.token;
  console.log(CookieToken);
  if (!CookieToken) {
    next();
  }
  const UserData = ValidateToken(CookieToken);
  if (!UserData) {
    next();
  }
  const CurrentUser = await User.findById(UserData.id);
  req.user = CurrentUser;
  next();
}

module.exports = {
  CheckTokenForLogin,
  IsLoggedIn,
};

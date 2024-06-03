const User = require("../models/User.js");
const { ValidateToken } = require("../controllers/session.js");

async function IsLoggedIn(req, res, next) {
  const CookieToken = req.cookies?.token;
  if (!CookieToken) {
    return res.redirect("/Login");
  }

  try {
    const UserData = ValidateToken(CookieToken);
    const CurrentUser = await User.findById(UserData.id);
    req.user = CurrentUser;
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    return res.redirect("/Login");
  }
}

async function CheckTokenForLogin(req, res, next) {
  const CookieToken = req.cookies?.token;
  if (!CookieToken) {
    return next();
  }

  try {
    const UserData = ValidateToken(CookieToken);
    const CurrentUser = await User.findById(UserData.id);
    req.user = CurrentUser;
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    next();
  }
}

module.exports = {
  CheckTokenForLogin,
  IsLoggedIn,
};

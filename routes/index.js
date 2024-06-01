var express = require("express");
const { HandleUserLogin, HandleUserSignUp } = require("../controllers/auth");
const { IsLoggedIn } = require("../Middleware/AUTH.JS");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/Home", (req, res) => {
  res.render("home", {
    user: req.user,
  });
});
router.get("/Login", (req, res) => {
  res.render("log_in", {
    user: req.user,
  });
});
router.post("/Login", HandleUserLogin);
router.get("/SignUp", (req, res) => {
  res.render("sign_up", {
    user: req.user,
  });
});
router.post("/SignUp", HandleUserSignUp);
router.get("/Blog", IsLoggedIn, (req, res) => {
  res.render("blog_page", {
    user: req.user,
  });
});
router.get("/price", (req, res) => {
  res.render("price", {
    user: req.user,
  });
});
router.get("/privacy", (req, res) => {
  res.render("privacy", {
    user: req.user,
  });
});
router.get("/about", (req, res) => {
  res.render("about_us", {
    user: req.user,
  });
});
router.get("/profile", IsLoggedIn, (req, res) => {
  res.render("profile", {
    user: req.user,
  });
});
router.get("/author", IsLoggedIn, (req, res) => {
  res.render("author", {
    user: req.user,
  });
});
router.get("/setting", IsLoggedIn, (req, res) => {
  res.render("setting", {
    user: req.user,
  });
});
router.get("/create", IsLoggedIn, (req, res) => {
  res.render("add_blog", {
    user: req.user,
  });
});
router.get("/Error", (req, res) => {
  res.render("error");
});
module.exports = router;

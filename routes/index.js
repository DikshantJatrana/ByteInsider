var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/Home", (req, res) => {
  res.render("home");
});
router.get("/Login", (req, res) => {
  res.render("log_in");
});
router.get("/SignUp", (req, res) => {
  res.render("sign_up");
});
router.get("/Error", (req, res) => {
  res.render("error");
});
module.exports = router;

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
router.get("/Blog", (req, res) => {
  res.render("blog_page");
});
router.get("/price", (req, res) => {
  res.render("price");
});
router.get("/privacy", (req, res) => {
  res.render("privacy");
});
router.get("/about", (req, res) => {
  res.render("about_us");
});
router.get("/profile", (req, res) => {
  res.render("profile");
});
router.get("/author", (req, res) => {
  res.render("author");
});
router.get("/setting", (req, res) => {
  res.render("setting");
});
router.get("/create", (req, res) => {
  res.render("add_blog");
});
router.get("/Error", (req, res) => {
  res.render("error");
});
module.exports = router;

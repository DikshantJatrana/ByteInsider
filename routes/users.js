var express = require("express");
const {
  HandleUserLogin,
  HandleUserSignUp,
  LogoutUser,
} = require("../controllers/auth");
const { IsLoggedIn } = require("../Middleware/AUTH.JS");
const upload = require("../controllers/multer");
const Blog = require("../models/Blog");
const User = require("../models/User");
const { profile, Console } = require("console");
const path = require("path");
var router = express.Router();

/* GET users listing. */
router.post("/Login", HandleUserLogin);

router.post("/SignUp", HandleUserSignUp);

router.get("/Logout", LogoutUser);

router.post("/write", upload.single("coverPhoto"), async (req, res) => {
  const { title, content } = req.body;
  console.log(req.file);
  const NewBlog = await Blog.create({
    title,
    content,
    coverPhoto: `/images/upload/${req.file.filename}`,
    author: req.user._id,
  });
  await User.findByIdAndUpdate(req.user._id, { $push: { Blog: NewBlog._id } });
  res.redirect("/home");
});

router.post(
  "/setting",
  upload.fields([
    { name: "ProfilePhoto", maxCount: 1 },
    { name: "CoverPhoto", maxCount: 1 },
  ]),
  async (req, res) => {
    const ProfilePhotoPath = `/images/upload/${req.files.ProfilePhoto[0].filename}`;
    const CoverPhotoPath = `/images/upload/${req.files.CoverPhoto[0].filename}`;
    const { Bio, TwitterLink, InstagramLink, LinkedinLink } = req.body;

    const updateData = {
      Bio: Bio ? Bio.split(",") : [],
      TwitterLink,
      InstagramLink,
      LinkedinLink,
      CoverPhoto: CoverPhotoPath,
      ProfilePhoto: ProfilePhotoPath,
    };

    await User.findByIdAndUpdate(req.user._id, updateData, { new: true });
    res.redirect("/Profile");
  }
);
module.exports = router;

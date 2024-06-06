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
const Comment = require("../models/comment");
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
  await User.findByIdAndUpdate(req.user._id, { $push: { blog: NewBlog._id } });
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
router.post("/comment/:id", IsLoggedIn, async (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  const blogid = await Blog.findById(id);
  const newComment = await Comment.create({
    content,
    blog: blogid._id,
    commentWriter: req.user._id,
  });
  await Blog.findByIdAndUpdate(id, { $addToSet: { comments: newComment._id } });
  res.redirect(`/blog/${id}`);
});

router.get("/follow/:id", IsLoggedIn, async (req, res) => {
  const id = req.params.id;
  const author = await User.findById(id);
  const UserId = req.user._id;
  await User.findByIdAndUpdate(id, { $addToSet: { Follower: UserId } });
  await User.findByIdAndUpdate(UserId, {
    $addToSet: { Following: author._id },
  });
  res.redirect(`/author/${id}`);
});
router.get("/unfollow/:id", IsLoggedIn, async (req, res) => {
  const id = req.params.id;
  const author = await User.findById(id);
  const UserId = req.user._id;
  await User.findByIdAndUpdate(id, { $pull: { Follower: UserId } });
  await User.findByIdAndUpdate(UserId, { $pull: { Following: author._id } });
  res.redirect(`/author/${id}`);
});
router.get("/like/:id", IsLoggedIn, async (req, res) => {
  const id = req.params.id;
  const Blogs = await Blog.findById(id);
  const UserId = req.user._id;
  await Blog.findByIdAndUpdate(Blogs._id, { $addToSet: { like: UserId } });
  await User.findByIdAndUpdate(UserId, {
    $addToSet: { Liked: Blogs._id },
  });
  res.redirect(`/Home`);
});
router.get("/unlike/:id", IsLoggedIn, async (req, res) => {
  const id = req.params.id;
  const Blogs = await Blog.findById(id);
  const UserId = req.user._id;
  await Blog.findByIdAndUpdate(Blogs._id, { $pull: { like: UserId } });
  await User.findByIdAndUpdate(UserId, {
    $pull: { Liked: Blogs._id },
  });
  res.redirect(`/Home`);
});
module.exports = router;

var express = require("express");
const {
  HandleUserLogin,
  HandleUserSignUp,
  LogoutUser,
} = require("../controllers/auth");
const { IsLoggedIn } = require("../Middleware/AUTH.JS");
const Blog = require("../models/Blog");
const User = require("../models/User");
const Comment = require("../models/comment");
const { error } = require("console");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    user: req.user,
  });
});
router.get("/Home", async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("author");
    const blog3 = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("author")
      .limit(3);
    const blog1 = await Blog.findOne().sort({ visits: -1 }).populate("author");
    const userdata = await User.findById(req.user._id); // Fetch full user data

    if (!userdata) {
      throw new Error("User data not found");
    }

    const likedBlogs = userdata.Liked || [];

    const blogsWithLikeStatus = blogs.map((blog) => {
      const isLiked = likedBlogs.some((likedBlogId) =>
        likedBlogId.equals(blog._id)
      );
      return { ...blog.toObject(), isLiked };
    });

    const blog3WithLikeStatus = blog3.map((blog) => {
      const isLiked = likedBlogs.some((likedBlogId) =>
        likedBlogId.equals(blog._id)
      );
      return { ...blog.toObject(), isLiked };
    });

    const blog1WithLikeStatus = blog1
      ? {
          ...blog1.toObject(),
          isLiked: likedBlogs.some((likedBlogId) =>
            likedBlogId.equals(blog1._id)
          ),
        }
      : null;

    res.render("home", {
      user: req.user,
      Blogs: blogsWithLikeStatus,
      Blog1: blog1WithLikeStatus,
      Blog3: blog3WithLikeStatus,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/Login", (req, res) => {
  res.render("log_in", {
    user: req.user,
  });
});
router.get("/SignUp", (req, res) => {
  res.render("sign_up", {
    user: req.user,
  });
});
router.get("/blog/:objectid", IsLoggedIn, async (req, res) => {
  const id = req.params.objectid;
  const blogupdate = await Blog.findByIdAndUpdate(id, { $inc: { visits: 1 } });
  const blog = await Blog.findById(id).populate("author");
  const comments = await Comment.find({ blog: blog._id }).populate(
    "commentWriter"
  );
  res.render("blog_page", {
    user: req.user,
    blog,
    comments,
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
router.get("/profile", IsLoggedIn, async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id).populate("Blogs");
  const userLike = await User.findById(id).populate("Liked");
  console.log(userLike);
  res.render("profile", {
    user,
    userLike,
  });
});
router.get("/author/:id", IsLoggedIn, async (req, res) => {
  const id = req.params.id;
  const UserId = req.user._id;
  const Userdata = await User.findById(UserId);
  const author = await User.findById(id).populate("Blogs");
  if (author._id.toString() == req.user._id.toString()) {
    res.redirect("/profile");
  } else {
    const isFollowing = author.Follower.includes(UserId);
    res.render("author", {
      user: req.user,
      author,
      Following: isFollowing ? "Following" : null,
    });
  }
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

const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  coverPhoto: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  visits: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Blog = new mongoose.model("Blog", BlogSchema);

module.exports = Blog;

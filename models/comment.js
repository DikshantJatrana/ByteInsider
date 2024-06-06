const mongoose = require("mongoose");
const { type } = require("os");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  commentWriter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  blog: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

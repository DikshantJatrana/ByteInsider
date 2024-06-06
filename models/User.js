const mongoose = require("mongoose");
const { type } = require("os");
const { createHmac, randomBytes } = require("crypto");
const { GenerateTokenforUser } = require("../controllers/session");

const UserSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Salt: {
    type: String,
  },
  Password: {
    type: String,
    required: true,
  },
  Follower: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  Following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  Liked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  Bio: {
    type: Array,
    default: [],
  },
  ProfilePhoto: {
    type: String,
    default: "/images/user.png",
  },
  CoverPhoto: {
    type: String,
  },
  Blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  TwitterLink: {
    type: String,
  },
  InstagramLink: {
    type: String,
  },
  LinkedinLink: {
    type: String,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("Password")) return;

  const salt = randomBytes(16).toString();
  const HashedPassword = createHmac("sha256", salt)
    .update(user.Password)
    .digest("hex");

  this.Salt = salt;
  this.Password = HashedPassword;
  next();
});

UserSchema.static("MatchingPassword", async function (Email, Password) {
  const user = await this.findOne({ Email });
  if (!user) {
    return null;
  }
  const salt = user.Salt;
  const HashedPassword = user.Password;

  const UserProvidedPassword = createHmac("sha256", salt)
    .update(Password)
    .digest("hex");
  if (HashedPassword !== UserProvidedPassword) {
    return null;
  } else {
    const token = GenerateTokenforUser(user);
    return token;
  }
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;

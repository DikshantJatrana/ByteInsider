const { array } = require("i/lib/util");
const mongoose = require("mongoose");
const { type } = require("os");
const { createHmac, randomBytes } = require("crypto");

mongoose
  .connect("mongodb://localhost:27017/Byte-Insider")
  .then(console.log("MongoDB is connected"));

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
  Follower: {
    type: Array,
    default: [],
  },
  Following: {
    type: Array,
    default: [],
  },
  Liked: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
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
  Blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
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
    console.log("User Not Found");
  }
  const salt = user.Salt;
  const HashedPassword = user.Password;

  const UserProvidedPassword = createHmac("sha256", salt)
    .update(Password)
    .digest("hex");
  if (HashedPassword !== UserProvidedPassword) {
    console.log("Incorrect password");
  } else {
    return { ...user, Password: undefined, Salt: undefined };
  }
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;

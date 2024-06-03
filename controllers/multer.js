const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/upload"));
  },
  filename: function (req, file, cb) {
    const unqiueName = `${Date.now()}${file.originalname}`;
    cb(null, unqiueName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

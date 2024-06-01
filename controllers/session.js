const jwt = require("jsonwebtoken");
const Secret = "dikshant@123$Numbers";

function GenerateTokenforUser(User) {
  const payload = {
    id: User._id,
    Email: User.Email,
  };
  const token = jwt.sign(payload, Secret);
  return token;
}

function ValidateToken(token) {
  const payload = jwt.verify(token, Secret);
  return payload;
}

module.exports = {
  GenerateTokenforUser,
  ValidateToken,
};

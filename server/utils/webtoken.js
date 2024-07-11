const jwt = require("jsonwebtoken");

const secretKey =
  "$2b$10$R/Xg/EO7T56FnWtVWIkHMOC3mUhZxBMiCTipjCOVeYsa/pPd1Sgqe";
const webToken = ({ id, name, email }) => {
  const payload = {
    id: id,
    username: name,
    email: email,
  };

  const options = {
    expiresIn: "1h", // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader === undefined) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const bearerToken = bearerHeader.split(" ")[1];

  jwt.verify(bearerToken, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Unauthorized 4" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { webToken, verifyToken };

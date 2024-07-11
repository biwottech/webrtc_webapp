const express = require("express");
const authenticateToken = require("../handlers/authHandler");
const { register, login } = require("../controllers/authController");
const router = express.Router();

router.post("/api/signup", register);
router.post("/api/login", login);

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to express sequlize study!" });
});

router.get("/protected", authenticateToken, (req, res) => {
  console.log("protected route working!!");
});

module.exports = router;

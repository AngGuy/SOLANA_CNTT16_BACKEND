const express = require("express");
const { registerUser } = require("../controllers/userController");

const router = express.Router();

// Route: Đăng ký user
router.post("/register", registerUser);

module.exports = router;

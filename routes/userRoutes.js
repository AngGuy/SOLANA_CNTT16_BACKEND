const express = require("express");
const {
  registerUser,
  checkUserWallet,
} = require("../controllers/userController");

const router = express.Router();

// Route: Đăng ký user
router.post("/register", registerUser);
router.post("/check-email/:walletAddress", checkUserWallet);
module.exports = router;

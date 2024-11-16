const { callGameshyftAPI } = require("../services/gameshyftService");

// Đăng ký user
const registerUser = async (req, res) => {
  const { referenceId, email, externalWalletAddress } = req.body;
  const body = { referenceId, email, externalWalletAddress };

  try {
    const response = await callGameshyftAPI("/users", "POST", body);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

module.exports = { registerUser };

const { callGameshiftAPI } = require("../services/gameshyftService");

// Đăng ký user
const registerUser = async (req, res) => {
  try {
    const { referenceId, email, externalWalletAddress } = req.body;
    if (!referenceId || !email || !externalWalletAddress) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const body = { referenceId, email, externalWalletAddress };
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(`https://api.gameshift.dev/nx/users`, options);
    const data = await response.json();
    if (response.ok) {
      res.status(200).json(data);
    } else {
      console.error("Failed to Register, status:", response.status, data);
      res.status(response.status).json({ error: "Failed to Register." });
    }
  } catch (err) {
    console.error("Error Register:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { registerUser };

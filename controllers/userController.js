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
const checkUserWallet = async (req, res) => {
  try {
    // URL của Gameshift API
    const { walletAddress } = req.params; // Lấy walletAddress từ params
    const url = `https://api.gameshift.dev/nx/users/wallet/${walletAddress}`;

    // Thiết lập headers và các tuỳ chọn
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": process.env.API_KEY, // Lấy API key từ biến môi trường
      },
    };

    // Gửi yêu cầu tới API
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      // Nếu yêu cầu thành công, trả về dữ liệu từ API
      res.status(200).json(data);
    } else {
      // Nếu yêu cầu thất bại, trả về lỗi
      console.error("Failed to fetch user wallet:", response.status, data);
      res.status(response.status).json({
        error: `Failed to fetch user wallet. Status: ${response.status}`,
      });
    }
  } catch (err) {
    // Xử lý lỗi trong quá trình thực hiện
    console.error("Error fetching user wallet:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { registerUser, checkUserWallet };

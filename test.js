const express = require("express");
const router = express.Router();
// Endpoint để lấy NFT theo ownerReferenceId
router.post("/fetch-nfts", async (req, res) => {
  try {
    const { ownerReferenceId } = req.body;

    if (!ownerReferenceId) {
      return res
        .status(400)
        .json({ error: "Missing required field: ownerReferenceId." });
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": process.env.API_KEY,
      },
    };

    const response = await fetch(
      "https://api.gameshift.dev/nx/items?types=&collectionId=${process.env.collectionId}&ownerReferenceId=${ownerReferenceId}",
      options
    );
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
      console.log(data);
    } else {
      console.error("Failed to fetch NFTs, status:", response.status, data);
      res.status(response.status).json({ error: "Failed to fetch NFTs." });
    }
  } catch (err) {
    console.error("Error fetching NFTs:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
});
module.exports = router;

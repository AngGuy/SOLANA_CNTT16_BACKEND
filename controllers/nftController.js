const { callGameshyftAPI } = require("../services/gameshyftService");

// Tạo collection
const createCollection = async (req, res) => {
  const { name, description, imageUrl } = req.body;
  const body = { name, description, imageUrl };

  try {
    const response = await callGameshyftAPI("/asset-collections", "POST", body);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to create collection" });
  }
};

// Tạo NFT
const createNFT = async (req, res) => {
  const { details, destinationUserReferenceId } = req.body;
  const body = { details, destinationUserReferenceId };

  try {
    const response = await callGameshyftAPI("/unique-assets", "POST", body);
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to create NFT" });
  }
};

// List NFT lên sàn
const listForSale = async (req, res) => {
  const { assetId, price } = req.body;
  const body = { price };

  try {
    const response = await callGameshyftAPI(
      `/unique-assets/${assetId}/list-for-sale`,
      "POST",
      body
    );
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to list NFT for sale" });
  }
};

// Mua NFT từ marketplace
const buyNFT = async (req, res) => {
  const { assetId, buyerId } = req.body;
  const body = { buyerId };

  try {
    const response = await callGameshyftAPI(
      `/unique-assets/${assetId}/buy`,
      "POST",
      body
    );
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to buy NFT" });
  }
};

// Lấy danh sách tất cả NFT
const fetchItems = async (req, res) => {
  const { ownerReferenceId } = req.query;

  try {
    const response = await callGameshyftAPI("GET");
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
};

module.exports = {
  createCollection,
  createNFT,
  listForSale,
  buyNFT,
  fetchItems,
};

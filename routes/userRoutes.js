const express = require("express");
const {
  createCollection,
  createNFT,
  listForSale,
  buyNFT,
  fetchItems,
} = require("../controllers/nftController");

const router = express.Router();

// Route: Tạo collection
router.post("/create-collection", createCollection);

// Route: Tạo NFT
router.post("/create-nft", createNFT);

// Route: List NFT lên sàn
router.post("/list-for-sale", listForSale);

// Route: Mua NFT
router.post("/buy-nft", buyNFT);

// Route: Lấy danh sách NFT
router.get("/fetch-items", fetchItems);

module.exports = router;

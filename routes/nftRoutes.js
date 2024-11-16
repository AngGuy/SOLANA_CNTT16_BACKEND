const express = require("express");
const {
  buyNFT,
  fetchItems2,
  fetchNFTs,
  createUniqueAsset,
  listAssetForSale,
  getItem,
  getAllNFT,
} = require("../controllers/nftController");

const router = express.Router();

// Route: Tạo NFT
router.post("/create-nft", createUniqueAsset);

// Route: List NFT lên sàn
router.post("/list-for-sale", listAssetForSale);

// Route: Mua NFT
router.post("/buy-nft", buyNFT);

// Route: Lấy danh sách NFT
router.get("/fetch-items", fetchItems2);

//Lấy riêng NFT
router.get("/get-item/:itemId", getItem);

//Lấy all NFT
router.get("/get-all-nft", getAllNFT);

router.get("/fetch-nfts", fetchNFTs);

module.exports = router;

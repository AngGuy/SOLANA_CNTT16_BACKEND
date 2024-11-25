const { callGameshyftAPI } = require("../services/gameshyftService");

// Tạo NFT
const createUniqueAsset = async (req, res) => {
  try {
    const {
      attributes,
      collectionId = "c1fccce9-d359-42c0-8f40-3ee2a54b83cc", // Sử dụng giá trị mặc định
      description,
      imageUrl,
      name,
      destinationUserReferenceId,
    } = req.body;
    console.log(req.body);
    // Kiểm tra các trường bắt buộc
    if (
      !Array.isArray(attributes) ||
      attributes.length === 0 ||
      !destinationUserReferenceId ||
      !name ||
      !description ||
      !imageUrl
    ) {
      return res
        .status(400)
        .json({ error: "Missing or invalid required fields." });
    }

    const formattedAttributes = attributes.map((attr) => ({
      traitType: attr.traitType || "Unknown",
      value: attr.value || "Unknown",
    }));

    const body = {
      details: {
        attributes: formattedAttributes,
        collectionId,
        description,
        imageUrl,
        name,
      },
      destinationUserReferenceId,
    };

    const url = "https://api.gameshift.dev/nx/unique-assets";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY,
      },
      body: JSON.stringify(body),
    };

    // Gửi request
    const response = await fetch(url, options);
    const data = await response.json();

    // Kiểm tra phản hồi từ API
    if (response.ok) {
      res.status(200).json(data);
    } else {
      console.error(
        "Failed to create unique asset, status:",
        response.status,
        data
      );
      res
        .status(response.status)
        .json({ error: "Failed to create unique asset." });
    }
  } catch (err) {
    console.error("Error creating unique asset:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// List NFT lên sàn
const listAssetForSale = async (req, res) => {
  try {
    const { IdNFT, currencyId, naturalAmount } = req.body; // Nhận thêm IdNFT từ body
    if (!IdNFT || !currencyId || !naturalAmount) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const url = `https://api.gameshift.dev/nx/unique-assets/${IdNFT}/list-for-sale`; // Sử dụng IdNFT trong URL

    const body = {
      price: {
        currencyId,
        naturalAmount,
      },
    };

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY,
      },
      body: JSON.stringify(body),
    };

    console.log("Listing NFT for sale:", url, body);

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data); // Trả về dữ liệu từ API
    } else {
      console.error("Failed to list asset, status:", response.status, data);
      res
        .status(response.status)
        .json({ error: "Failed to list asset for sale." });
    }
  } catch (err) {
    console.error("Error listing asset for sale:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

const buyNFT = async (req, res) => {
  try {
    const { IdNFT, buyerId } = req.body; // Nhận IdNFT và buyerId từ body
    if (!IdNFT || !buyerId) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const url = `https://api.gameshift.dev/nx/unique-assets/${IdNFT}/buy`; // Sử dụng IdNFT trong URL

    const body = {
      buyerId,
    };

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": process.env.API_KEY, // Đảm bảo API_KEY được cấu hình trong môi trường
      },
      body: JSON.stringify(body),
    };

    console.log("Buying NFT:", url, body);

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data); // Trả về dữ liệu từ API
    } else {
      console.error("Failed to buy NFT, status:", response.status, data);
      res.status(response.status).json({ error: "Failed to purchase NFT." });
    }
  } catch (err) {
    console.error("Error buying NFT:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

const fetchItems2 = async (req, res) => {
  const url = "https://api.gameshift.dev/nx/items";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": process.env.API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching data from external API" });
  }
};

const getItem = async (req, res) => {
  try {
    const { itemId } = req.params; // Lấy itemId từ tham số của URL
    if (!itemId) {
      return res.status(400).json({ error: "Missing item ID." });
    }

    const url = `https://api.gameshift.dev/nx/items/${itemId}`; // Sử dụng itemId trong URL

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": process.env.API_KEY, // Đảm bảo API_KEY được cấu hình trong môi trường
      },
    };

    console.log("Fetching item:", url);

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data); // Trả về dữ liệu từ API
    } else {
      console.error("Failed to fetch item, status:", response.status, data);
      res.status(response.status).json({ error: "Failed to fetch item." });
    }
  } catch (err) {
    console.error("Error fetching item:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

const fetchNFTs = async (req, res) => {
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
      `https://api.gameshift.dev/nx/items?types=&collectionId=${process.env.collectionId}&ownerReferenceId=${ownerReferenceId}`,
      options
    );
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      console.error("Failed to fetch NFTs, status:", response.status, data);
      res.status(response.status).json({ error: "Failed to fetch NFTs." });
    }
  } catch (err) {
    console.error("Error fetching NFTs:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

//get all NFT
const getAllNFT = async (req, res) => {
  const collectionID = process.env.collectionId;
  try {
    const url = `https://api.gameshift.dev/nx/asset-collections/${collectionID}/assets`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": process.env.API_KEY, // Đảm bảo API_KEY được cấu hình trong môi trường
      },
    };

    console.log("Fetching all NFTs:", url);

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data); // Trả về dữ liệu từ API
    } else {
      console.error("Failed to fetch NFTs, status:", response.status, data);
      res.status(response.status).json({ error: "Failed to fetch NFTs." });
    }
  } catch (err) {
    console.error("Error fetching NFTs:", err);
    res.status(500).json({ error: "Something went wrong." });
  }
};
const getAllForSaleNFTs = async (req, res) => {
  try {
    const url = "https://api.gameshift.dev/nx/items?forSale=true"; // API endpoint
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": process.env.API_KEY, // Sử dụng biến môi trường cho API key
      },
    };

    console.log("Fetching all NFTs for sale from:", url);

    // Thực hiện fetch dữ liệu
    const response = await fetch(url, options);

    // Kiểm tra xem response có thành công không
    if (!response.ok) {
      console.error("Failed to fetch NFTs for sale, status:", response.status);
      return res
        .status(response.status)
        .json({ error: "Failed to fetch NFTs for sale." });
    }

    const data = await response.json();

    // Log dữ liệu để kiểm tra
    console.log("NFTs for sale fetched successfully:", data);

    // Trả về dữ liệu JSON cho client
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching NFTs for sale:", err);
    // Xử lý lỗi server
    res
      .status(500)
      .json({ error: "Something went wrong while fetching NFTs." });
  }
};

module.exports = {
  createUniqueAsset,
  listAssetForSale,
  buyNFT,
  fetchItems2,
  getItem,
  fetchNFTs,
  getAllNFT,
  getAllForSaleNFTs,
};

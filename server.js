const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const nftRoutes = require("./routes/nftRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes); // Prefix: /api/users
app.use("/api/nfts", nftRoutes); // Prefix: /api/nfts

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

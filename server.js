// server.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");
const app = express();

// 中間件
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // 託管靜態文件

// API 路由
app.post("/api/generate", async (req, res) => {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
      req.body,
      { params: { key: process.env.GOOGLE_API_KEY } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 前端路由（確保所有未定義路由返回 index.html）
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
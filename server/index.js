const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/submit", async (req, res) => {
  try {
    const response = await axios.post(
      "https://windbornesystems.com/career_applications.json",
      req.body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Backend error:", error.response?.data || error);
    res.status(500).json({ error: "Failed to submit application" });
  }
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));

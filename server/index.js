const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// app.post("/submit", async (req, res) => {
//   try {
//     const response = await axios.post(
//       "https://windbornesystems.com/career_applications.json",
//       req.body,
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error("Backend error:", error.response?.data || error);
//     res.status(500).json({ error: "Failed to submit application" });
//   }
// });
function validateRecord(record) {
  if (!Array.isArray(record) || record.length !== 3) return false;

  const [lat, lon, alt] = record;

  // Type check
  if (
    typeof lat !== "number" ||
    typeof lon !== "number" ||
    typeof alt !== "number"
  ) {
    return false;
  }

  // Range checks
  const validLat = lat >= -90 && lat <= 90;
  const validLon = lon >= -180 && lon <= 180;
  const validAlt = alt >= 0 && alt <= 45000;

  return validLat && validLon && validAlt;
}

app.get("/api/balloons", async (req, res) => {
  try {
    const response = await axios.get(
      "https://a.windbornesystems.com/treasure/00.json"
    );

    const rawData = response.data; // massive array
    const cleanedData = rawData.filter(validateRecord);
    // [longitude, latitude, altitude]; NOT[(latitude, longitude, altitude)];

    res.json({
      count_raw: rawData.length,
      count_clean: cleanedData.length,
      data: cleanedData,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch balloon data" });
  }
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));

const axios = require("axios");

function validateRecord(record) {
  if (!Array.isArray(record) || record.length !== 3) return false;
  const [lat, lon, alt] = record;

  return (
    typeof lat === "number" &&
    typeof lon === "number" &&
    typeof alt === "number" &&
    lat >= -90 &&
    lat <= 90 &&
    lon >= -180 &&
    lon <= 180 &&
    alt >= 0 &&
    alt <= 45000
  );
}

module.exports = async (req, res) => {
  try {
    const hr = req.query.hr || "00";
    const url = `https://a.windbornesystems.com/treasure/${hr}.json`;

    const response = await axios.get(url);

    const rawData = response.data;
    const cleanedData = rawData.filter(validateRecord);

    res.status(200).json({
      hr,
      count_raw: rawData.length,
      count_clean: cleanedData.length,
      data: cleanedData,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch balloon data" });
  }
};

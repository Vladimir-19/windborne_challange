import axios from "axios";

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

export default async function handler(req, res) {
  try {
    const hr = req.query.hr || "00";
    const url = `https://a.windbornesystems.com/treasure/${hr}.json`;

    const response = await axios.get(url);
    const cleanedData = response.data.filter(validateRecord);

    res.status(200).json({
      hr,
      count_raw: response.data.length,
      count_clean: cleanedData.length,
      data: cleanedData,
    });
  } catch (err) {
    console.error("Balloon API error:", err.message);
    res.status(500).json({ error: "Failed to fetch balloon data" });
  }
}

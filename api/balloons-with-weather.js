import axios from "axios";

// In-memory weather cache
const weatherCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Validate balloon data
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

    const results = await Promise.all(
      cleanedData.map(async ([lat, lon, alt]) => {
        const key = `${lat},${lon}`;
        const cache = weatherCache.get(key);

        // Return cached weather if valid
        if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
          return { lat, lon, alt, weather: cache.data };
        }

        // Fetch weather
        try {
          const weatherRes = await axios.get(
            "https://api.open-meteo.com/v1/forecast",
            {
              params: {
                latitude: lat,
                longitude: lon,
                current_weather: true,
              },
            }
          );

          const weather = weatherRes.data.current_weather || null;

          // Save to cache
          weatherCache.set(key, { timestamp: Date.now(), data: weather });

          return { lat, lon, alt, weather };
        } catch (err) {
          console.error("Weather error:", err);
          const isLimit =
            err?.response?.data?.error ||
            err?.response?.data?.reason ||
            err?.response?.status === 429;

          return {
            lat,
            lon,
            alt,
            weather: null,
            error: isLimit
              ? "Daily API request limit exceeded"
              : "Weather unavailable",
          };
        }
      })
    );

    const anyErrors = results.some((r) => r.error);
    res.status(200).json({
      hr,
      data: results,
      error: anyErrors ? "Some weather data could not be loaded" : null,
    });
  } catch (err) {
    console.error("Weather balloon route error:", err);
    res.status(500).json({ error: "Failed to fetch data with weather" });
  }
}

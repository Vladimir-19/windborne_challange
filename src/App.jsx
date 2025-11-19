import { useState, useEffect } from "react";
import { HourSelect } from "./components/HourSelect";
import { MapView } from "./components/MapView";

function App() {
  const [hour, setHour] = useState("00");
  const [showWeather, setShowWeather] = useState(false);

  // raw balloons
  const [balloons, setBalloons] = useState([]);
  // weather balloons
  const [weatherBalloons, setWeatherBalloons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  // Load raw balloons whenever hour changes
  useEffect(() => {
    async function fetchBalloons() {
      try {
        const res = await fetch(`/api/balloons?hr=${hour}`);
        const data = await res.json();
        setBalloons(data.data || []);
      } catch (err) {
        console.error("Failed to load balloons", err);
        setBalloons([]);
      }
    }
    fetchBalloons();
  }, [hour]);

  // Load weather balloons when toggled ON
  useEffect(() => {
    if (!showWeather) return;

    async function fetchWeatherBalloons() {
      setLoading(true);
      setWeatherError(null);
      try {
        const res = await fetch(`/api/balloons-with-weather?hr=${hour}`);
        const data = await res.json();

        if (data.error) setWeatherError(data.error);
        setWeatherBalloons(data.data || []);
      } catch (err) {
        console.error("Failed to load weather balloons", err);
        setWeatherError("Failed to load weather data");
        setWeatherBalloons([]);
      } finally {
        setLoading(false);
      }
    }

    fetchWeatherBalloons();
  }, [hour, showWeather]);

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/submitApplication", { method: "POST" });
      const json = await res.json();
      console.log("Server response:", json, "also", res);
      alert(
        json.success
          ? "Application submitted successfully!"
          : `Submission failed: ${json.error}`
      );
    } catch (err) {
      console.error(err);
      alert("Submission failed due to network error.");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#f8f9fa",
        fontFamily: "'Inter', sans-serif",
        color: "#333",
        paddingTop: 20,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 10, marginTop: 20 }}>
        <h1 style={{ fontSize: "2.5rem", margin: 0, fontWeight: 700 }}>
          WindBorne
        </h1>
        <p style={{ fontSize: "1.1rem", marginTop: 8, color: "#555" }}>
          See locations of our balloons for the past 23 hours — with optional
          live weather data.
        </p>
      </div>

      <div
        style={{
          width: "90%",
          maxWidth: "1400px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "8px 4px",
          marginBottom: 10,
          borderBottom: "1px solid #ddd",
        }}
      >
        <HourSelect hour={hour} setHour={setHour} />

        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            type="checkbox"
            checked={showWeather}
            onChange={() => setShowWeather((prev) => !prev)}
          />
          Show Weather
        </label>

        {loading && (
          <span style={{ fontSize: 13, color: "#666" }}>Loading weather…</span>
        )}
        {weatherError && (
          <span style={{ fontSize: 13, color: "red" }}>{weatherError}</span>
        )}
      </div>

      <div
        style={{
          width: "90%",
          height: "75%",
          maxWidth: "1400px",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
        }}
      >
        <MapView
          balloons={showWeather ? weatherBalloons : balloons}
          showWeather={showWeather}
        />
      </div>
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: 6,
          border: "none",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "#fff",
        }}
      >
        Submit Application
      </button>
    </div>
  );
}

export default App;

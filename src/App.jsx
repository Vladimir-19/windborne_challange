import { useState } from "react";
import { useBalloonData } from "./hooks/useBalloonData";
import { useWeatherBalloonData } from "./hooks/useWeatherBalloonData";
import { HourSelect } from "./components/HourSelect";
import { MapView } from "./components/MapView";

function App() {
  const [hour, setHour] = useState("00");
  const [showWeather, setShowWeather] = useState(false);

  // raw balloons (always loaded)
  const balloons = useBalloonData(hour);

  // weather balloons (only load when toggled)
  const {
    balloons: weatherBalloons,
    loading,
    error: weatherError,
  } = useWeatherBalloonData(hour, showWeather);

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
        <MapView balloons={showWeather ? weatherBalloons : balloons} />
      </div>
    </div>
  );
}

export default App;

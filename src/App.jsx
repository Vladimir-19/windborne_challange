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
  const { balloons: weatherBalloons, loading } = useWeatherBalloonData(
    hour,
    showWeather
  );

  return (
    <div style={{ width: "100vw", height: "100vh", padding: 16 }}>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <HourSelect hour={hour} setHour={setHour} />

        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="radio"
            checked={showWeather}
            onChange={() => setShowWeather((prev) => !prev)}
          />
          Show Weather
        </label>

        {loading && <span>Loading weather...</span>}
      </div>

      <MapView balloons={showWeather ? weatherBalloons : balloons} />
    </div>
  );
}

export default App;

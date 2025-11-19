import { useState } from "react";
import { useBalloonData } from "./hooks/useBalloonData";
import { HourSelect } from "./components/HourSelect";
import { MapView } from "./components/MapView";

function App() {
  const [hour, setHour] = useState("00");
  const [showWeather, setShowWeather] = useState(false);

  const balloons = useBalloonData(hour, showWeather);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{ display: "flex", gap: "20px", padding: "10px" }}>
        <HourSelect hour={hour} setHour={setHour} />

        {/* NEW RADIO TOGGLE */}
        <label>
          <input
            type="checkbox"
            checked={showWeather}
            onChange={(e) => setShowWeather(e.target.checked)}
          />
          Show Weather
        </label>
      </div>
      <MapView balloons={balloons} showWeather={showWeather} />
      {/* Example button - remove later */}
      {/* <button onClick={submitApplication}>Submit debug application</button>{" "} */}
    </div>
  );
}

export default App;

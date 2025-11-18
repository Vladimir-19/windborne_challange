import { useState } from "react";
import { useBalloonData } from "./hooks/useBalloonData";
import { HourSelect } from "./components/HourSelect";
import { MapView } from "./components/MapView";
import { submitApplication } from "./api/submitApplication";

function App() {
  const [hour, setHour] = useState("00");
  const balloons = useBalloonData(hour);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <HourSelect hour={hour} setHour={setHour} />
      <MapView balloons={balloons} />

      {/* Example button - remove later */}
      <button onClick={submitApplication}>Submit debug application</button>
    </div>
  );
}

export default App;

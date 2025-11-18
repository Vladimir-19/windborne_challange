import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useBalloonData } from "./useBalloonData";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// FIX ICON BUG
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function App() {
  async function submitApplication() {
    const response = await fetch(
      "https://windbornesystems.com/career_applications.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          career_application: {
            name: "Vladimir",
            email: "Salavei",
            role: "Junior Web Developer",
            notes:
              "I stay calm under pressure, and consistently drive teams toward high-quality, on-time delivery while keeping collaboration positive and productive",
            submission_url: "https://your-submission.com",
            portfolio_url: "https://your-portfolio.com",
            resume_url: "https://your-resume.com",
          },
        }),
      }
    );

    const data = await response.json();
    console.log(data);
  }

  const [hour, setHour] = useState("00");
  const balloons = useBalloonData(hour);

  const hourOptions = Array.from({ length: 24 }, (_, i) => {
    if (i === 0) return { value: "00", label: "Now" };
    return { value: i.toString().padStart(2, "0"), label: `${i} hr ago` };
  });

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <select
        value={hour}
        onChange={(e) => setHour(e.target.value)}
        style={{ margin: "10px", padding: "6px", fontSize: "16px" }}
      >
        {hourOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <MapContainer
        center={[0, 0]}
        zoom={2}
        minZoom={1}
        maxZoom={10}
        style={{ width: "90%", height: "80%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {balloons.map(([lon, lat], i) => (
          <Marker key={i} position={[lat, lon]} />
        ))}
      </MapContainer>
    </div>
  );
}

export default App;

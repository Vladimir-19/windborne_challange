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

  const balloons = useBalloonData();
  // export function validateRecord([lat, lon, alt]) {
  //   if (
  //     typeof lat !== "number" ||
  //     typeof lon !== "number" ||
  //     typeof alt !== "number"
  //   )
  //     return false;

  //   const validLat = lat >= -90 && lat <= 90;
  //   const validLon = lon >= -180 && lon <= 180;
  //   const validAlt = alt >= 0 && alt <= 45000; // depends on your mission

  //   return validLat && validLon && validAlt;
  // }

  // export function cleanData(records) {
  //   return records.filter(
  //     (r) => Array.isArray(r) && r.length === 3 && validateRecord(r)
  //   );
  // }

  return (
    // <div>
    //   <button onClick={submitApplication}>Submit Application</button>
    // </div>
    // <MapContainer center={[0, 0]} zoom={2} style={{ height: "100vh" }}>
    //   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    //   {balloons.map(([lat, lon], idx) => (
    //     <Marker key={idx} position={[lat, lon]} />
    //   ))}
    // </MapContainer>
    // <div>{balloons}</div>
    // <MapContainer center={[0, 0]} zoom={2} style={{ height: "100vh" }}>
    //   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

    //   {balloons.map((b, i) => (
    //     <Marker key={i} position={[b.lat, b.lon]} />
    //   ))}
    // </MapContainer>
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        minZoom={1} // 👈 user cannot zoom out past world view
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

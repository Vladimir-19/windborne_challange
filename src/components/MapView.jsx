import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom colors
function coloredIcon(color) {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
}

export function MapView({ balloons, showWeather }) {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ width: "90%", height: "85%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {balloons.map((b, i) => {
        const lat = b.lat ?? b[0];
        const lon = b.lon ?? b[1];

        // Weather endpoint returns objects: {lat,lon,alt,weather}
        const w = b.weather;

        const icon = w ? coloredIcon("green") : coloredIcon("red");

        return (
          <Marker key={i} position={[lat, lon]} icon={icon}>
            {showWeather && (
              <Popup>
                {!w ? (
                  <div>No weather data</div>
                ) : (
                  <div>
                    <strong>Temperature:</strong> {w.temperature}°C
                    <br />
                    <strong>Wind:</strong> {w.windspeed} m/s
                    <br />
                    <strong>Direction:</strong> {w.winddirection}°
                  </div>
                )}
              </Popup>
            )}
          </Marker>
        );
      })}
    </MapContainer>
  );
}

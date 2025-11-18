import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export function MapView({ balloons }) {
  return (
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
  );
}

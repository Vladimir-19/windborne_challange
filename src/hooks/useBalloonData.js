import { useEffect, useState } from "react";

export function useBalloonData(hour = "00", showWeather = false) {
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    async function load() {
      const endpoint = showWeather
        ? `/api/balloons-with-weather?hr=${hour}`
        : `/api/balloons?hr=${hour}`;

      const res = await fetch(endpoint);
      const json = await res.json();
      setBalloons(json.data);
    }

    load();
  }, [hour, showWeather]);

  return balloons;
}

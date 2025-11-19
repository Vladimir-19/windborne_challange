import { useEffect, useState } from "react";

export function useWeatherBalloonData(hour, enabled) {
  const [balloons, setBalloons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled) return; // do nothing until toggle is ON

    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/balloons-with-weather?hr=${hour}`);
        const json = await res.json();
        setBalloons(json.data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [hour, enabled]);

  return { balloons, loading };
}

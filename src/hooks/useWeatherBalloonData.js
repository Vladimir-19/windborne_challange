import { useState, useEffect } from "react";

export function useWeatherBalloonData(hour, enabled) {
  const [balloons, setBalloons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled) return;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/balloons-with-weather?hr=${hour}`);
        const json = await res.json();

        if (json.error) setError(json.error);

        setBalloons(json.data);
      } catch (e) {
        setError("Failed to load weather data");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [hour, enabled]);

  return { balloons, loading, error };
}

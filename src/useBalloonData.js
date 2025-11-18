import { useEffect, useState } from "react";

export function useBalloonData(hour = "00") {
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/balloons?hr=${hour}`);
      const json = await res.json();
      setBalloons(json.data);
    }

    load();
  }, [hour]);

  return balloons;
}

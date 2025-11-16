import { useEffect, useState } from "react";

export function useBalloonData() {
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("http://localhost:3000/api/balloons");
      const json = await res.json();
      setBalloons(json.data);
    }

    load();
  }, []);

  return balloons;
}

export function HourSelect({ hour, setHour }) {
  const hourOptions = Array.from({ length: 24 }, (_, i) => {
    if (i === 0) return { value: "00", label: "Now" };
    return { value: i.toString().padStart(2, "0"), label: `${i} hrs ago` };
  });

  return (
    <select
      value={hour}
      onChange={(e) => setHour(e.target.value)}
      style={{
        margin: "10px",
        padding: "6px",
        fontSize: "16px",
        borderRadius: 12,
      }}
    >
      {hourOptions.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

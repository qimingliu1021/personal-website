"use client";

const BLUE = "rgb(0, 46, 255)";

// Positions are in percentages of the SVG viewBox (0-100).
// Laid out roughly top-left → bottom-right but on a zig-zag diagonal.
const cities = [
  { name: "Korla", date: "~2018", x: 14, y: 18 },
  { name: "Beijing", date: "~2023", x: 52, y: 32 },
  { name: "Berkeley", date: "2022", x: 30, y: 58 },
  { name: "New York", date: "2023~", x: 74, y: 80 },
];

// Curved path between two points. We offset the control point
// perpendicular to the line so each road feels like an arc / bridge.
const curvedPath = (a, b, curvature = 14) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  // perpendicular offset
  const ox = (-dy / len) * curvature;
  const oy = (dx / len) * curvature;
  return `M ${a.x} ${a.y} Q ${mx + ox} ${my + oy} ${b.x} ${b.y}`;
};

const CityMarker = ({ city }) => {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${city.x}%`, top: `${city.y}%` }}
    >
      <div className="flex flex-col items-center">
        <div
          className="relative flex h-6 w-6 items-center justify-center rounded-full"
          style={{ backgroundColor: BLUE }}
        >
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
            style={{ backgroundColor: BLUE }}
          />
          <span className="relative block h-2 w-2 rounded-full bg-white" />
        </div>
        <div
          className="mt-3 rounded-md border-2 px-3 py-1 text-center font-display text-lg font-semibold leading-tight"
          style={{
            backgroundColor: "#ffffff",
            borderColor: BLUE,
            color: BLUE,
          }}
        >
          <div>{city.name}</div>
          <div className="text-xs font-medium opacity-80">{city.date}</div>
        </div>
      </div>
    </div>
  );
};

const CitiesPage = () => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* subtle paper-like texture via radial gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(0,46,255,0.08), transparent 60%), radial-gradient(circle at 80% 75%, rgba(0,46,255,0.06), transparent 55%)",
        }}
      />

      <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col px-6 py-10">
        <h2
          className="font-display text-2xl font-semibold sm:text-3xl"
          style={{ color: BLUE }}
        >
          Places that shaped me
        </h2>
        <p className="mt-2 max-w-xl text-sm" style={{ color: BLUE }}>
          Four cities, a messy diagonal across years — each connected by a
          road, a flight, a bridge.
        </p>

        {/* Map canvas */}
        <div className="relative mt-6 w-full flex-1" style={{ minHeight: "60vh" }}>
          {/* Connector roads (SVG) */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            {cities.slice(0, -1).map((c, i) => {
              const next = cities[i + 1];
              return (
                <path
                  key={`${c.name}-${next.name}`}
                  d={curvedPath(c, next, i % 2 === 0 ? 14 : -14)}
                  fill="none"
                  stroke={BLUE}
                  strokeWidth={0.6}
                  strokeDasharray="1.6 1.2"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>

          {/* City markers */}
          {cities.map((c) => (
            <CityMarker key={c.name} city={c} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitiesPage;

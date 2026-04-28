"use client";

const BLUE = "rgb(0, 46, 255)";
const BLACK = "#000000";

// Positions are in percentages of the SVG viewBox (0-100).
// Left half (0-40) = China. Middle (40-60) = Pacific Ocean.
// Right half (60-100) = US. Each continent has its own uneven layout.
const cities = [
  // China — Korla top-left, Beijing bottom-right of the left half
  { name: "Korla", date: "~2018", x: 6, y: 22, side: "cn" },
  { name: "Beijing", date: "~2023", x: 26, y: 64, side: "cn" },
  // US — Berkeley bottom-left, New York top-right of the right half
  { name: "Berkeley", date: "2022", x: 76, y: 72, side: "us" },
  { name: "New York", date: "2023~", x: 94, y: 28, side: "us" },
];

// Curved path between two points (perpendicular control offset).
const curvedPath = (a, b, curvature = 10) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
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
          className="relative flex h-4 w-4 items-center justify-center rounded-full"
          style={{ backgroundColor: BLUE }}
        >
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
            style={{ backgroundColor: BLUE }}
          />
          <span className="relative block h-1.5 w-1.5 rounded-full bg-white" />
        </div>
        <div
          className="mt-2 rounded-md border-2 px-2 py-0.5 text-center font-display text-sm font-semibold leading-tight"
          style={{
            backgroundColor: "#ffffff",
            borderColor: BLUE,
            color: BLACK,
          }}
        >
          <div>{city.name}</div>
          <div className="text-[10px] font-medium opacity-80">{city.date}</div>
        </div>
      </div>
    </div>
  );
};

const CitiesPage = () => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="relative mx-auto flex w-full max-w-5xl flex-col px-6 py-8"
        style={{ minHeight: "80vh" }}
      >
        <h2
          className="font-display text-xl font-semibold sm:text-2xl"
          style={{ color: BLACK }}
        >
          Cities
        </h2>
        <p
          className="mt-1 max-w-xl text-xs sm:text-sm"
          style={{ color: BLACK }}
        >
          Four cities, a messy diagonal across years — each connected by a
          road, a flight, a bridge.
        </p>

        {/* Map canvas */}
        <div className="relative mt-16 w-full" style={{ minHeight: "44vh" }}>
          {/* Pacific Ocean — organic blob with wavy coastline-like edges */}
          <div
            className="pointer-events-none absolute"
            style={{
              left: "33%",
              width: "34%",
              top: "-8%",
              bottom: "-8%",
            }}
          >
            <svg
              viewBox="0 0 100 400"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              style={{
                filter:
                  "drop-shadow(0 6px 18px rgba(0, 46, 255, 0.35))",
              }}
            >
              <defs>
                {/* Organic ocean shape — wavy coastlines on left & right,
                    soft top & bottom curves so it reads as a body of water,
                    not a rectangle. */}
                <clipPath id="ocean-clip">
                  <path
                    d="
                      M 22 6
                      Q 8 30 14 70
                      T 10 150
                      T 16 230
                      T 8 320
                      Q 12 380 30 394
                      L 70 394
                      Q 88 380 92 320
                      T 84 230
                      T 90 150
                      T 86 70
                      Q 92 30 78 6
                      Q 65 0 50 3
                      Q 35 0 22 6
                      Z"
                  />
                </clipPath>
              </defs>

              {/* Ocean fill */}
              <path
                d="
                  M 22 6
                  Q 8 30 14 70
                  T 10 150
                  T 16 230
                  T 8 320
                  Q 12 380 30 394
                  L 70 394
                  Q 88 380 92 320
                  T 84 230
                  T 90 150
                  T 86 70
                  Q 92 30 78 6
                  Q 65 0 50 3
                  Q 35 0 22 6
                  Z"
                fill={BLUE}
              />

              {/* Texture — long, thin, drifting current lines.
                  Hand-drawn feel: wide horizontal sine sweeps at varying
                  vertical positions and amplitudes. Clipped to the ocean. */}
              <g clipPath="url(#ocean-clip)" stroke="#ffffff" fill="none" strokeLinecap="round">
                {Array.from({ length: 18 }).map((_, i) => {
                  const y = 18 + i * 22 + (i % 3) * 4;
                  const amp = 4 + (i % 4) * 1.5;
                  const startX = 6 + (i % 5) * 3;
                  const endX = 94 - (i % 4) * 4;
                  const midX = (startX + endX) / 2;
                  return (
                    <path
                      key={`wave-${i}`}
                      d={`M ${startX} ${y} Q ${midX - 18} ${y - amp} ${midX} ${y} T ${endX} ${y}`}
                      strokeWidth={i % 4 === 0 ? 1.4 : 0.8}
                      opacity={0.55 + (i % 3) * 0.12}
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}

                {/* Scattered tilde-shaped whitecaps for surface dimension */}
                {Array.from({ length: 22 }).map((_, i) => {
                  const x = 18 + ((i * 47) % 64);
                  const y = 30 + ((i * 73) % 340);
                  const len = 4 + (i % 3) * 2;
                  return (
                    <path
                      key={`cap-${i}`}
                      d={`M ${x} ${y} q ${len / 2} -${len / 2} ${len} 0 t ${len} 0`}
                      strokeWidth={0.9}
                      opacity={0.7}
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </g>
            </svg>

            {/* Ocean label — vertical, centered */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap font-display text-xs font-semibold tracking-[0.4em] text-white opacity-90">
              PACIFIC OCEAN
            </div>
          </div>

          {/* Connector roads/flights (SVG) — only within each continent */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            {/* Korla → Beijing (within China) */}
            <path
              d={curvedPath(cities[0], cities[1], 12)}
              fill="none"
              stroke={BLUE}
              strokeWidth={0.6}
              strokeDasharray="1.6 1.2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* Berkeley → New York (within US) */}
            <path
              d={curvedPath(cities[2], cities[3], -12)}
              fill="none"
              stroke={BLUE}
              strokeWidth={0.6}
              strokeDasharray="1.6 1.2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
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

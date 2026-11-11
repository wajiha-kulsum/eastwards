/* South and Southeast Asia on the site's 10px dot lattice, with the logo's
   4x7 triangle drawn in blue dots and its tip on Singapore, the same recipe
   as DotHero's DotMark. Generated once from Natural Earth 1:50m land
   (public domain): crop 68°E to 128°E, 27°N to 11°S, 1.13° per dot, a dot
   wherever 30% of its cell is land. */

const LAND = [
  "11111111111111111111111111111111111111111111110000000",
  "11111111111111111111111111111111111111111111100000000",
  "11111111111111111111111111111111111111111111001100000",
  "01111111111111111111111111111111111111111110001000000",
  "01111111111111111111011111111111111111110000000000000",
  "00101111111111111000011111111111111001000000000000000",
  "00001111111111110000001111111111110011000000000000000",
  "00001111111111100000000111111111110010000000001100000",
  "00001111111110000000000111111111110000000000001100000",
  "00000111111100000000000110111111111100000000001100000",
  "00000111111000000000000000111111111100000000001100000",
  "00000011111000000000000000111111111110000000000110000",
  "00000011111000000000000000010111111110000000001101000",
  "00000011111000000000000000010001111100000000000011100",
  "00000001111000000000000000010001111000000000000010100",
  "00000001110000000000000000010000110000000000000010000",
  "00000000101100000000000000011000000000000000000011110",
  "00000000001100000000000000001000000000000000000001110",
  "00000000000100000000000000001110000000000011000000100",
  "00000000000000000000000011100110000000000111100000000",
  "00000000000000000000000001110110000000001111000000000",
  "00000000000000000000000000111111000000111111000000000",
  "00000000000000000000000000011101000011111111100000001",
  "00000000000000000000000000011111000011111111001111001",
  "00000000000000000000000000001111000011111111010100000",
  "00000000000000000000000000000111110001111110011100000",
  "00000000000000000000000000000111110101111110011100010",
  "00000000000000000000000000000011110000000000010110000",
  "00000000000000000000000000000000110000000000010000000",
  "00000000000000000000000000000000011100000000000000000",
  "00000000000000000000000000000000001111111000000000000",
  "00000000000000000000000000000000000000001101101000110",
  "00000000000000000000000000000000000000000000011001000",
];

const PITCH = 10;
const COLS = LAND[0].length;
const ROWS = LAND.length;
const SINGAPORE = { col: 31, row: 22 };

type Dot = { col: number; row: number };

const mark: Dot[] = [];
for (let col = 0; col < 4; col++)
  for (let row = 0; row < 7; row++)
    if (row >= col && row <= 6 - col)
      mark.push({ col: SINGAPORE.col - 3 + col, row: SINGAPORE.row - 3 + row });

// Land dots under the triangle are skipped, the blue dots take their place
const land: Dot[] = LAND.flatMap((line, row) =>
  [...line].flatMap((cell, col) =>
    cell === "1" && !mark.some((m) => m.col === col && m.row === row) ? [{ col, row }] : []
  )
);

function Dots({ dots, r, className }: { dots: Dot[]; r: number; className: string }) {
  return (
    <g className={className}>
      {dots.map(({ col, row }) => (
        <circle
          key={`${col}-${row}`}
          cx={col * PITCH + PITCH / 2}
          cy={row * PITCH + PITCH / 2}
          r={r}
        />
      ))}
    </g>
  );
}

export function DotMap({ label }: { label: string }) {
  return (
    // Phones get a 4:3 window zoomed in around Singapore (the map at 160%,
    // shifted so Singapore sits at about 55% across and 50% down) with soft
    // edges, instead of the whole region shrunk to 6px dots
    <div
      aria-hidden="true"
      className="relative max-sm:aspect-[4/3] max-sm:overflow-hidden max-sm:[mask-image:radial-gradient(ellipse_at_55%_50%,#000_50%,transparent_100%)]"
    >
      <div className="relative max-sm:absolute max-sm:left-[-40%] max-sm:top-[-40%] max-sm:w-[160%]">
        {/* top fade so the crop doesn't slice the mainland with a hard edge */}
        <svg
          viewBox={`0 0 ${COLS * PITCH} ${ROWS * PITCH}`}
          className="block h-auto w-full [mask-image:linear-gradient(to_bottom,transparent,#000_24%)]"
        >
          <Dots dots={land} r={1.6} className="fill-white/30" />
          {/* a touch larger than the land dots so the mark holds at 1x on black */}
          <Dots dots={mark} r={2} className="fill-primary" />
        </svg>
        <span
          className="absolute -translate-y-1/2 rounded-md bg-band/90 px-2 py-0.5 text-small font-medium text-white"
          style={{
            left: `${((SINGAPORE.col + 1.4) / COLS) * 100}%`,
            top: `${((SINGAPORE.row + 0.5) / ROWS) * 100}%`,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

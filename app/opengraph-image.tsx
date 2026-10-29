import { ImageResponse } from "next/og";

/* One social card for every route. Drawn with the brand's blue and the logo
   triangle (a CSS border triangle, so no extra asset). Type uses ImageResponse's
   bundled font: the site's Inter Display ships as woff2, which next/og cannot
   parse (ttf/otf/woff only) and loading a second font would eat into the 500KB
   card budget. */
export const alt = "Eastwards Consulting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#2868FF",
          color: "#ffffff",
          fontSize: 28,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* brand triangle; a clipped square, since satori draws no CSS
              border triangles */}
          <div
            style={{
              width: 42,
              height: 48,
              background: "#ffffff",
              clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
            }}
          />
          <div style={{ fontSize: 44 }}>Eastwards</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 84,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: 940,
          }}
        >
          Technology that moves business forward
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#d7e2ff",
          }}
        >
          <div>Technology consulting, engineering & expertise</div>
          <div>eastwards.co</div>
        </div>
      </div>
    ),
    size
  );
}

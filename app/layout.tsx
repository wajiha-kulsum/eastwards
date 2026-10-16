import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

/* Inter Display Bold — headlines + footer wordmark
   (stands in for the design's commercial Neue Haas Grotesk Display Pro) */
const interDisplay = localFont({
  src: "./fonts/InterDisplay-Bold.woff2",
  weight: "700",
  variable: "--font-inter-display",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
  title: "Eastwards Consulting — Technology that moves business forward",
  description:
    "We help businesses navigate complexity and move forward with the right technology, engineering, and expertise.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interDisplay.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Instrument_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

/* Inter Display Bold, headlines + footer wordmark
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
  metadataBase: new URL("https://eastwards.co"),
  title: "Eastwards Consulting | Technology that moves business forward",
  description:
    "We help businesses navigate complexity and move forward with the right technology, engineering, and expertise.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${interDisplay.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col transition-colors duration-300">
        {/* Runs before paint: stored theme wins, else system preference.
            Toggle component flips the class and mirrors it to storage. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()',
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-small focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

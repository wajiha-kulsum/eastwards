import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CoreValues } from "@/components/CoreValues";
import BlogShowcase from "@/components/BlogShowcase";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <CoreValues />
        <BlogShowcase />
      </main>
      <Footer />
    </>
  );
}

import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CoreValues } from "@/components/CoreValues";
import BlogShowcase from "@/components/BlogShowcase";

export default function Home() {
  return (
    <>
      <main id="main" className="flex-1">
        <Hero />
        <Features />
        <CoreValues />
        <BlogShowcase />
      </main>
    </>
  );
}


import Hero from "@/Sections/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <section className="h-screen bg-secondary">
          <div></div>
        </section>
      </main>
    </div>
  );
}

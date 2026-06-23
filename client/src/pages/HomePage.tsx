import Commitment from "@/components/Commitment";
import EventShowcase from "@/components/EventShowcase";
import GooeyLinks from "@/components/GooeyLinks";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Commitment />
      <EventShowcase />
      <GooeyLinks />
    </div>
  );
}

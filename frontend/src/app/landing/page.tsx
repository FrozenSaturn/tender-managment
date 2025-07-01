import { HeroText } from "./components/Hero";
import { Features } from "./components/Features";
import { About } from "./components/About";

export default function LandingPage() {
  return (
    <main>
      <HeroText />
      <Features />
      <About />
    </main>
  );
}

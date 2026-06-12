import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Gallery from "@/components/sections/Gallery";
import Social from "@/components/sections/Social";
import Journal from "@/components/sections/Journal";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Gallery />
      <Social />
      <Journal />
      <Contact />
    </main>
  );
}

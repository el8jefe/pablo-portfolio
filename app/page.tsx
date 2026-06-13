import { sanityClient } from "@/sanity/lib/client";
import Hero from "@/components/sections/Hero";
import About, { type SiteSettings } from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Gallery, { type SanityPhoto } from "@/components/sections/Gallery";
import Social from "@/components/sections/Social";
import Journal from "@/components/sections/Journal";
import Contact from "@/components/sections/Contact";

export const revalidate = 3600;

export default async function Home() {
  let photos: SanityPhoto[] = [];
  let settings: SiteSettings | null = null;

  try {
    [photos, settings] = await Promise.all([
      sanityClient.fetch<SanityPhoto[]>(
        '*[_type == "photo"] | order(date desc, _createdAt desc)'
      ),
      sanityClient.fetch<SiteSettings | null>(
        '*[_type == "siteSettings"][0]'
      ),
    ]);
  } catch {
    // Sanity not yet populated — components fall back to hardcoded defaults
  }

  return (
    <main>
      <Hero />
      <About settings={settings} />
      <Skills />
      <Projects />
      <Gallery photos={photos} />
      <Social />
      <Journal />
      <Contact />
    </main>
  );
}

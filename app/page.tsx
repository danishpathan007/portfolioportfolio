import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Achievements } from "@/components/achievements";

export default function Home() {
  return (
    <>
      <Hero />
      <Journey />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
    </>
  );
}

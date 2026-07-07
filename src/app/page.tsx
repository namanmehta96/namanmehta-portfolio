import { site } from "@/data/site";
import { caseStudies, projects, type ProjectNote } from "@/data/projects";
import { Hero } from "@/components/sections/Hero";
import { WorkList } from "@/components/sections/WorkList";
import { AboutTeaser } from "@/components/sections/AboutTeaser";

// First two sentences of the bio, derived — never retyped.
const bioExcerpt = `${site.bio.split(". ").slice(0, 2).join(". ")}.`;

export default function Home() {
  const note = projects.find((p): p is ProjectNote => p.type === "note");

  return (
    <>
      <Hero
        name={site.name}
        tagline={site.tagline}
        availability={site.availability}
        location={site.location}
        heroLine={site.heroLine}
      />
      <WorkList
        caseStudies={caseStudies.map(
          ({ slug, title, oneLiner, tech, accent, recognition }) => ({
            slug,
            title,
            oneLiner,
            tech,
            accent,
            recognition,
          }),
        )}
        note={note ? { title: note.title, body: note.body } : null}
      />
      <AboutTeaser excerpt={bioExcerpt} />
    </>
  );
}

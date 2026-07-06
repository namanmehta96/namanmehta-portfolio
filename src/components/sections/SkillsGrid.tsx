import { skills } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { Rule } from "@/components/motion/Rule";
import { Counter } from "@/components/motion/Counter";

interface SkillsGridProps {
  index?: number;
}

export function SkillsGrid({ index }: SkillsGridProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-[clamp(4rem,10vw,8rem)] md:px-10">
      <div className="flex items-center gap-4">
        {index !== undefined && (
          <Counter
            value={index}
            className="text-xs tracking-[0.25em] text-accent tabular-nums"
          />
        )}
        <h2 className="text-xs uppercase tracking-[0.25em] text-muted">
          Skills
        </h2>
        <Rule className="flex-1" />
      </div>
      <div className="mt-12 grid grid-cols-1 gap-y-12 md:mt-16 md:grid-cols-2 md:gap-x-16 md:gap-y-14">
        {skills.map((group) => (
          <Reveal key={group.label}>
            <h3 className="text-xs uppercase tracking-[0.25em] text-accent">
              {group.label}
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-foreground/15 px-3.5 py-1.5 text-sm text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

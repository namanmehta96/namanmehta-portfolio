import { experience } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { Rule } from "@/components/motion/Rule";
import { Counter } from "@/components/motion/Counter";
import { TimelineSpine } from "@/components/motion/TimelineSpine";

interface TimelineProps {
  index?: number;
}

export function Timeline({ index }: TimelineProps) {
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
          Experience
        </h2>
        <Rule className="flex-1" />
      </div>
      <ol className="relative mt-12 md:mt-16">
        <TimelineSpine />
        {experience.map((entry) => (
          <li
            key={`${entry.title}-${entry.period}`}
            className="pb-14 last:pb-0"
          >
            <Reveal className="relative pl-8 md:pl-12">
              <span
                aria-hidden="true"
                className="absolute -left-[3.5px] top-2 h-2 w-2 rounded-full bg-accent"
              />
              <p className="text-sm tabular-nums text-muted">{entry.period}</p>
              <h3 className="mt-2 font-heading text-xl font-medium tracking-tight text-foreground md:text-2xl">
                {entry.title}
              </h3>
              <p className="mt-1 text-muted">{entry.organization}</p>
              {entry.clients && (
                <ul className="mt-4 space-y-2">
                  {entry.clients.map((client) => (
                    <li
                      key={client}
                      className="flex items-center gap-3 text-sm text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="h-px w-3 shrink-0 bg-foreground/30"
                      />
                      {client}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

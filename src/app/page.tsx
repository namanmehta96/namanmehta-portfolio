import { site } from "@/data/site";

// Temporary boot-check placeholder. The real homepage is built in the next session.
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-heading text-[clamp(3rem,10vw,9rem)] font-bold leading-none tracking-tight">
        {site.name}
      </h1>
      <p className="text-lg text-muted">{site.tagline}</p>
      <p className="text-sm text-accent">{site.availability}</p>
    </main>
  );
}

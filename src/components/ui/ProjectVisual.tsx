import Image from "next/image";
import type { Project } from "@/types/portfolio";

export default function ProjectVisual({
  project,
  className = "",
  sizes,
  priority = false,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-sunken ${className}`}>
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 70% 20%, rgb(var(--accent-rgb)/0.18), transparent 60%)",
            }}
          />
          <div className="absolute top-4 left-4 flex gap-1.5" aria-hidden>
            <span className="w-2.5 h-2.5 rounded-full bg-line-strong" />
            <span className="w-2.5 h-2.5 rounded-full bg-line-strong" />
            <span className="w-2.5 h-2.5 rounded-full bg-line-strong" />
          </div>
          <span className="relative text-[11px] font-mono uppercase tracking-wider text-accent-fg">
            {project.eyebrow || "Web Application"}
          </span>
          <span className="relative text-xl sm:text-2xl font-bold tracking-tight text-fg">
            {project.title}
          </span>
          <span className="relative text-[11px] font-mono text-muted/70">
            Screenshot coming soon
          </span>
        </div>
      )}
    </div>
  );
}
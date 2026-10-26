import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/portfolioData";
import ProjectDetail from "@/components/sections/ProjectDetail";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} | Borshon Roy`,
    description: project.tagline,
  };
}

/* params ekhane await hoy, Suspense er vitore */
async function ProjectContent({ params }: Props) {
  const { id } = await params;
  const index = projects.findIndex((p) => p.id === id);

  if (index === -1) notFound();

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return <ProjectDetail project={project} prev={prev} next={next} />;
}

/* Load howar somoy ei skeleton dekhay */
function ProjectFallback() {
  return (
    <main
      aria-busy="true"
      className="pt-28 sm:pt-36 pb-24 px-6 md:px-12 max-w-6xl mx-auto w-full"
    >
      <div className="h-4 w-24 rounded bg-surface-3 animate-pulse mb-8" />
      <div className="h-12 w-3/4 max-w-xl rounded-xl bg-surface-3 animate-pulse mb-5" />
      <div className="h-5 w-full max-w-lg rounded bg-surface-3 animate-pulse mb-12" />
      <div className="aspect-[16/9] w-full rounded-3xl bg-surface-2 border border-line animate-pulse" />
    </main>
  );
}

export default function ProjectPage({ params }: Props) {
  return (
    <Suspense fallback={<ProjectFallback />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}
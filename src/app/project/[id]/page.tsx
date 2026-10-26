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

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const index = projects.findIndex((p) => p.id === id);

  if (index === -1) notFound();

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return <ProjectDetail project={project} prev={prev} next={next} />;
}
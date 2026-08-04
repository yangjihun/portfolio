import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import ProjectDetail from './ProjectDetail';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    return { title: '프로젝트를 찾을 수 없습니다' };
  }

  const title = `${project.name} · ${project.title}`;

  return {
    title,
    description: project.summary,
    openGraph: {
      title,
      description: project.summary,
      type: 'article',
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}

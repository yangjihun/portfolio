'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data/projects';

const categoryColors = {
  frontend: 'bg-primary/10 text-primary border-primary/20',
  backend: 'bg-primary/10 text-primary border-primary/20',
  fullstack: 'bg-primary/10 text-primary border-primary/20',
  infra: 'bg-primary/10 text-primary border-primary/20',
  ai: 'bg-primary/10 text-primary border-primary/20',
  other: 'bg-primary/5 text-primary/80 border-primary/15',
};

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  fullstack: 'Fullstack',
  infra: 'Infra',
  ai: 'AI',
  other: 'Other',
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const project = projects.find((p) => p.id === slug);

  if (!project) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold">프로젝트를 찾을 수 없습니다</h1>
        <p className="mb-8 text-muted-foreground">
          요청하신 프로젝트가 존재하지 않습니다.
        </p>
        <Link
          href="/projects"
          className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
        >
          프로젝트 목록으로
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        className="mb-8 flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
      >
        <span className="text-xl">←</span>
        뒤로 가기
      </motion.button> 

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-bold md:text-5xl">{project.name}</h1>
          <span
            className={`rounded border px-3 py-1 text-sm font-medium ${
              categoryColors[project.category]
            }`}
          >
            {categoryLabels[project.category]}
          </span>
        </div>

        <div className="mb-6 flex flex-wrap gap-4 text-muted-foreground">
          <span>{project.period}</span>
          <span>•</span>
          <span>{project.role}</span>
        </div>

        <p className="text-xl leading-relaxed text-foreground">
          {project.summary}
        </p>
      </motion.div>

      {/* Links */}
      {project.links.length > 0 && project.links.some(link => link.href !== '#') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 flex flex-wrap gap-4"
        >
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href !== '#' ? '_blank' : undefined}
              rel={link.href !== '#' ? 'noopener noreferrer' : undefined}
              className={`rounded-lg border px-6 py-3 font-medium transition-all ${
                link.href === '#'
                  ? 'cursor-not-allowed border-border text-muted-foreground'
                  : 'border-border bg-background hover:border-primary/40 hover:bg-primary/5'
              }`}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}

      {/* Cover Image */}
      {project.image && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-muted/30">
            <Image
              src={project.image}
              alt={`${project.name} 이미지`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 768px"
              priority
            />
          </div>
        </motion.div>
      )}

      {/* Tech Stack */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="mb-6 text-2xl font-bold">사용 기술</h2>
        <div className="flex flex-wrap gap-3">
          {project.techTags.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-primary/15 bg-primary/8 px-4 py-2 text-sm font-medium text-primary"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.section>

      {/* Highlights */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="mb-6 text-2xl font-bold">주요 기능</h2>
        <ul className="space-y-4">
          {project.highlights.map((highlight, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex gap-3"
            >
              <span className="mt-1 text-primary">▸</span>
              <span className="flex-1 leading-relaxed text-foreground">
                {highlight}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* Responsibilities */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="mb-6 text-2xl font-bold">담당 역할</h2>
        <ul className="space-y-4">
          {project.responsibilities.map((responsibility, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex gap-3"
            >
              <span className="mt-1 text-primary">•</span>
              <span className="flex-1 leading-relaxed text-foreground">
                {responsibility}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center border-t border-border pt-12"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
        >
          모든 프로젝트 보기
        </Link>
      </motion.div>
    </div>
  );
}


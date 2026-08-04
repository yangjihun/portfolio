'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Trophy, Wrench } from 'lucide-react';
import { categoryStyle, type Project } from '@/data/projects';

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const router = useRouter();
  const category = categoryStyle[project.category];
  const activeLinks = project.links.filter((link) => link.href !== '#');

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
            className={`rounded border px-3 py-1 text-sm font-medium ${category.badge}`}
          >
            {category.label}
          </span>
        </div>

        <div className="mb-4 flex flex-wrap gap-4 text-muted-foreground">
          <span>{project.period}</span>
          <span aria-hidden>•</span>
          <span>{project.role}</span>
        </div>

        {project.award && (
          <p className="mb-6 inline-flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary">
            <Trophy className="h-4 w-4 shrink-0" aria-hidden />
            {project.award}
          </p>
        )}

        <p className="text-xl leading-relaxed text-foreground">
          {project.summary}
        </p>
      </motion.div>

      {/* Links */}
      {activeLinks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 flex flex-wrap gap-4"
        >
          {activeLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border bg-background px-6 py-3 font-medium transition-all hover:border-primary/40 hover:bg-primary/5"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}

      {/* 저장소 비공개 안내 */}
      {project.notice && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 flex items-start gap-2 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm leading-relaxed text-muted-foreground"
        >
          <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {project.notice}
        </motion.p>
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
              className="rounded-lg border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
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
              key={highlight}
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
              key={responsibility}
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

      {/* Troubleshooting */}
      {project.troubleshooting && project.troubleshooting.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="mb-6 text-2xl font-bold">트러블슈팅</h2>
          <div className="space-y-4">
            {project.troubleshooting.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.08 }}
                className="rounded-lg border border-border bg-muted/40 p-5"
              >
                <h3 className="mb-2 flex items-start gap-2 font-semibold text-foreground">
                  <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
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

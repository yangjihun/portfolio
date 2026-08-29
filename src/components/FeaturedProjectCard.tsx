'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Trophy } from 'lucide-react';
import { categoryStyle, type Project } from '@/data/projects';
import { formatTeamSize } from '@/lib/utils';

interface FeaturedProjectCardProps {
  project: Project;
  index?: number;
}

export default function FeaturedProjectCard({
  project,
  index = 0,
}: FeaturedProjectCardProps) {
  const category = categoryStyle[project.category];
  const teamSize = formatTeamSize(project.teamSize);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      <Link
        href={`/projects/${project.id}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary/25 bg-background shadow-sm transition-all hover:-translate-y-1 hover:border-primary/45 hover:shadow-lg"
      >
        {/* MAIN 배지 */}
        <span className="absolute right-4 top-5 z-10 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold tracking-wider text-primary-foreground shadow-sm">
          <Star className="h-3 w-3 fill-current" aria-hidden />
          MAIN
        </span>

        {project.image && (
          <div className="relative aspect-[16/9] overflow-hidden bg-muted/30">
            <Image
              src={project.image}
              alt={`${project.name} 썸네일`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="text-2xl font-bold leading-tight transition-colors group-hover:text-primary">
              {project.name}
            </h3>
            <span
              className={`shrink-0 rounded border px-2 py-1 text-xs font-medium ${category.badge}`}
            >
              {category.label}
            </span>
          </div>

          <p className="mb-3 text-sm font-medium text-foreground">{project.title}</p>

          {project.award && (
            <p className="mb-3 flex items-start gap-1.5 text-xs font-medium leading-relaxed text-primary">
              <Trophy className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
              {project.award}
            </p>
          )}

          <div className="mt-auto">
            <div className="mb-4 flex flex-wrap gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
              <span>{project.period}</span>
              <span>•</span>
              <span>{project.role}</span>
              {teamSize && (
                <>
                  <span>•</span>
                  <span>{teamSize}</span>
                </>
              )}
            </div>

            <div className="flex min-h-[3.75rem] flex-wrap content-start gap-2">
              {project.techTags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs text-primary"
                >
                  {tag}
                </span>
              ))}
              {project.techTags.length > 4 && (
                <span className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs text-primary/80">
                  +{project.techTags.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

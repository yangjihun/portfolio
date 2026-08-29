'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { categoryStyle, isFeaturedProject, type Project } from '@/data/projects';
import { formatTeamSize } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const category = categoryStyle[project.category];
  const teamSize = formatTeamSize(project.teamSize);
  // 검색·필터 결과에서는 대표 프로젝트도 이 카드로 섞여 나오므로 표시를 남겨둔다
  const featured = isFeaturedProject(project.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${project.id}`}
        className="group block h-full rounded-lg border border-border bg-muted/40 p-6 transition-all hover:border-primary/35 hover:bg-muted/70"
      >
        {project.image && (
          <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg border border-border bg-muted/30">
            <Image
              src={project.image}
              alt={`${project.name} 썸네일`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="flex items-center gap-1.5 text-xl font-bold group-hover:text-primary transition-colors">
              {project.name}
              {featured && (
                <Star
                  className="h-3.5 w-3.5 shrink-0 fill-primary text-primary"
                  aria-label="대표 프로젝트"
                />
              )}
            </h3>
            <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
              {project.title}
            </p>
          </div>
          <span
            className={`shrink-0 rounded border px-2 py-1 text-xs font-medium ${category.badge}`}
          >
            {category.label}
          </span>
        </div>
        
        <div className="mb-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
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

        <div className="flex flex-wrap gap-2">
          {project.techTags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs text-primary"
            >
              {tag}
            </span>
          ))}
          {project.techTags.length > 5 && (
            <span className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs text-primary/80">
              +{project.techTags.length - 5}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}


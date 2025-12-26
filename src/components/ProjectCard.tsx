'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const categoryColors = {
  frontend: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  backend: 'bg-green-500/10 text-green-400 border-green-500/20',
  fullstack: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  infra: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  ai: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  other: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  fullstack: 'Fullstack',
  infra: 'Infra',
  ai: 'AI',
  other: 'Other',
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${project.id}`}
        className="group block h-full rounded-lg border border-gray-800 bg-gray-900/50 p-6 transition-all hover:border-gray-700 hover:bg-gray-900/80"
      >
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-xl font-bold group-hover:text-white">
              {project.name}
            </h3>
            <p className="mt-1 line-clamp-1 text-sm text-gray-400">
              {project.title}
            </p>
          </div>
          <span
            className={`shrink-0 rounded border px-2 py-1 text-xs font-medium ${
              categoryColors[project.category]
            }`}
          >
            {categoryLabels[project.category]}
          </span>
        </div>
        
        <div className="mb-3 flex flex-wrap gap-2 text-sm text-gray-400">
          <span>{project.period}</span>
          <span>•</span>
          <span>{project.role}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.techTags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300"
            >
              {tag}
            </span>
          ))}
          {project.techTags.length > 5 && (
            <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400">
              +{project.techTags.length - 5}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}


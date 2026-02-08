'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import SectionTitle from '@/components/SectionTitle';
import { projects, type TechCategory } from '@/data/projects';

const categoryLabels: Record<TechCategory | 'all', string> = {
  all: '전체',
  frontend: 'Frontend',
  backend: 'Backend',
  fullstack: 'Fullstack',
  infra: 'Infra',
  ai: 'AI',
  other: 'Other',
};

const CATEGORY_ORDER: TechCategory[] = [
  'frontend',
  'fullstack',
  'backend',
  'infra',
  'ai',
  'other',
];

const AVAILABLE_CATEGORIES = new Set<TechCategory>(projects.map((p) => p.category));

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<TechCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techTags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories: (TechCategory | 'all')[] = useMemo(() => {
    const existing = CATEGORY_ORDER.filter((c) => AVAILABLE_CATEGORIES.has(c));
    return ['all', ...existing];
  }, []);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <SectionTitle subtitle="진행한 모든 프로젝트를 확인할 수 있습니다">
        프로젝트
      </SectionTitle>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="프로젝트 이름, 기술 스택으로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-foreground'
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 text-muted-foreground"
      >
        {filteredProjects.length}개의 프로젝트
      </motion.div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center text-muted-foreground"
        >
          <p className="text-xl">검색 결과가 없습니다</p>
          <p className="mt-2">다른 키워드로 다시 검색해보세요</p>
        </motion.div>
      )}
    </div>
  );
}


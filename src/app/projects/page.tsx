'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import FeaturedProjectCard from '@/components/FeaturedProjectCard';
import ProjectCard from '@/components/ProjectCard';
import SectionTitle from '@/components/SectionTitle';
import {
  categoryStyle,
  featuredProjects,
  otherProjects,
  projects,
  type TechCategory,
} from '@/data/projects';

const filterLabel = (category: TechCategory | 'all') =>
  category === 'all' ? '전체' : categoryStyle[category].label;

const CATEGORY_ORDER: TechCategory[] = [
  'frontend',
  'fullstack',
  'backend',
  'infra',
  'ai',
  'other',
];

const AVAILABLE_CATEGORIES = new Set<TechCategory>(projects.map((p) => p.category));

function GroupHeading({ title, count }: { title: string; count: number }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <h2 className="shrink-0 text-xl font-bold md:text-2xl">{title}</h2>
      <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
        {count}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<TechCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 필터·검색이 없을 때만 대표/그 외로 나눠 보여준다
  const isDefaultView = selectedCategory === 'all' && searchQuery.trim() === '';

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch =
        query === '' ||
        project.name.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.techTags.some((tag) => tag.toLowerCase().includes(query));
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
            type="search"
            aria-label="프로젝트 검색"
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
              {filterLabel(category)}
            </button>
          ))}
        </div>
      </motion.div>

      {isDefaultView ? (
        <>
          {/* 대표 프로젝트 */}
          <section className="mb-16">
            <GroupHeading title="주요 프로젝트" count={featuredProjects.length} />
            <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <FeaturedProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </section>

          {/* 그 외 프로젝트 */}
          <section>
            <GroupHeading title="그 외 프로젝트" count={otherProjects.length} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-muted-foreground"
          >
            {filteredProjects.length}개의 프로젝트
          </motion.div>

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
        </>
      )}
    </div>
  );
}

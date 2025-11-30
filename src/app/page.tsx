'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import SectionTitle from '@/components/SectionTitle';
import { projects } from '@/data/projects';

export default function HomePage() {
  // 최신 3개 프로젝트 (featured)
  const featuredProjects = projects.slice(0, 3);

  const techStack = [
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Node.js',
    'Express',
    'MongoDB',
    'AI/LLM',
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      {/* Hero Section */}
      <section className="mb-32 flex min-h-[70vh] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
            안녕하세요,
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              양지훈
            </span>
            입니다
          </h1>
          <p className="mb-8 text-xl text-gray-300 md:text-2xl">
            Frontend / Fullstack Developer
          </p>
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-400">
            웹 프론트엔드를 중심으로 풀스택 개발까지 경험하고 있으며,
            <br />
            AI, 블록체인, 인프라 등 다양한 기술에 관심을 가지고 있습니다.
          </p>

          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-gray-200"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/projects"
              className="rounded-lg bg-white px-8 py-3 font-semibold text-black transition-all hover:bg-gray-200"
            >
              프로젝트 보기
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-gray-700 px-8 py-3 font-semibold transition-all hover:border-gray-600 hover:bg-gray-900"
            >
              소개 보기
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-gray-700 px-8 py-3 font-semibold transition-all hover:border-gray-600 hover:bg-gray-900"
            >
              연락하기
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section className="mb-32">
        <SectionTitle subtitle="최근 진행한 주요 프로젝트입니다">
          주요 프로젝트
        </SectionTitle>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-300 transition-colors hover:text-white"
          >
            모든 프로젝트 보기
            <span className="text-xl">→</span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}


'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import FeaturedProjectCard from '@/components/FeaturedProjectCard';
import SectionTitle from '@/components/SectionTitle';
import { featuredProjects } from '@/data/projects';
import { activities } from '@/data/activities';

export default function HomePage() {
  const techStack = [
    // Languages
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    // Frontend
    'React',
    'Next.js',
    // Backend
    'Node.js',
    // Styling
    'Tailwind CSS',
    // Tools / Collaboration
    'Git',
    'GitHub',
    'Jira'
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      {/* Hero Section */}
      <section className="mb-0 flex min-h-[70vh] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
            안녕하세요,
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              양지훈
            </span>
            입니다
          </h1>
          <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
            Fullstack Developer
          </p>
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            추진력과 커뮤니케이션으로 서비스를 안정적으로 완성하는 풀스택 개발자입니다.
          </p>


          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="rounded-full border border-border bg-muted/60 px-4 py-2 text-sm font-medium text-foreground"
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
              className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              프로젝트 보기
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-border bg-background px-8 py-3 font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-primary/5"
            >
              소개 보기
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-border bg-background px-8 py-3 font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-primary/5"
            >
              연락하기
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Activities Section */}
      <section className="mb-20">
        <SectionTitle>활동 내역</SectionTitle>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
          <div className="space-y-0">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative py-4 text-center"
              >
                <div className="mx-auto mb-2 h-3.5 w-3.5 rounded-full border-2 border-primary/40 bg-background" />
                <div className="mb-0.5 text-sm text-muted-foreground">{activity.period}</div>
                <h3 className="text-base font-semibold md:text-lg">{activity.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/timeline"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            전체 활동 보기
            <span className="text-xl">→</span>
          </Link>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section className="mb-32">
        <SectionTitle>
          주요 프로젝트
        </SectionTitle>
        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard key={project.id} project={project} index={index} />
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
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            모든 프로젝트 보기
            <span className="text-xl">→</span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}


'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/SectionTitle';
import { timelineItems, categoryStyle } from '@/data/timeline';

export default function TimelinePage() {
  const years = [...new Set(timelineItems.map((item) => item.year))].sort((a, b) => b - a);
  const [activeYear, setActiveYear] = useState<number | 'all'>('all');

  const filtered =
    activeYear === 'all'
      ? timelineItems
      : timelineItems.filter((item) => item.year === activeYear);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <SectionTitle subtitle="참여한 프로그램, 해커톤, 활동 전체 기록입니다">
        활동 타임라인
      </SectionTitle>

      {/* Year tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveYear('all')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeYear === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
          }`}
        >
          전체
        </button>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeYear === year
                ? 'bg-primary text-primary-foreground'
                : 'border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <AnimatePresence mode="wait">
        <motion.div
          key={String(activeYear)}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mx-auto max-w-2xl space-y-3"
        >
          {filtered.map((item, index) => {
            const style = categoryStyle[item.category];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-lg border border-border bg-muted/40 px-6 py-5 transition-colors hover:border-primary/30 hover:bg-muted/70"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${style.badge}`}>
                    {style.label}
                  </span>
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-base font-semibold md:text-lg">{item.title}</h3>
                  <span className="shrink-0 text-sm text-muted-foreground">{item.period}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

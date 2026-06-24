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

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={String(activeYear)}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {filtered.map((item) => {
            const style = categoryStyle[item.category];
            return (
              <div
                key={item.id}
                className="flex flex-col rounded-lg border border-border bg-muted/40 overflow-hidden transition-colors hover:border-primary/30 hover:bg-muted/70"
              >
                <div className={`h-1 w-full ${style.bar}`} />
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
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
                  <p className="mb-1 text-xs text-muted-foreground">{item.period}</p>
                  <h3 className="mb-2 text-sm font-semibold leading-snug">{item.title}</h3>
                  <p className="mt-auto text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

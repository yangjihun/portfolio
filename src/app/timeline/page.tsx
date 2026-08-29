'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Trophy } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import { timelineItems, categoryStyle } from '@/data/timeline';
import { formatTeamSize } from '@/lib/utils';

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
            // 주최·역할은 적어 넣은 것만 한 줄로 이어 붙인다 (인원은 기간 옆에 따로 붙는다)
            const meta = [item.host, item.role].filter(
              (value): value is string => Boolean(value),
            );
            const teamSize = formatTeamSize(item.teamSize);
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
                  <div className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
                    {teamSize && (
                      <>
                        <span>{teamSize}</span>
                        <span aria-hidden>•</span>
                      </>
                    )}
                    <span>{item.period}</span>
                  </div>
                </div>
                {meta.length > 0 && (
                  <p className="mt-1.5 text-sm text-muted-foreground">{meta.join(' • ')}</p>
                )}

                {item.award && (
                  <p className="mt-2.5 inline-flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/5 px-3 py-1.5 text-sm font-semibold text-primary">
                    <Trophy className="h-4 w-4 shrink-0" aria-hidden />
                    {item.award}
                  </p>
                )}

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                {item.details && item.details.length > 0 && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.details.join(' ')}
                  </p>
                )}

                {item.links && item.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

'use client';

import { createContext, useContext, useRef, type ReactNode } from 'react';
import { Maximize2, X, type LucideIcon } from 'lucide-react';

const DiagramId = createContext('');

export const colors = {
  teal: { accent: '#0d5e58', tint: '#f0fdfa', border: '#99d5ce' },
  blue: { accent: '#0369a1', tint: '#f0f9ff', border: '#b4dbef' },
  violet: { accent: '#6d4bc3', tint: '#f7f5ff', border: '#d6c9f1' },
  amber: { accent: '#92400e', tint: '#fffbeb', border: '#e9d1a4' },
  slate: { accent: '#475569', tint: '#f8fafc', border: '#cbd5e1' },
};
type Tone = keyof typeof colors;

/** Hand-positioned SVG keeps routing and typography predictable without a diagram renderer. */
export function Canvas({ id, height, title, description, children }: {
  id: string; height: number; title: string; description: string; children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previewWidth = Math.min(720, Math.round(960 * 400 / height));
  const renderDiagram = (expanded: boolean) => {
    const canvasId = expanded ? `${id}-expanded` : id;
    return (
      <DiagramId.Provider value={canvasId}>
        <svg viewBox={`0 0 960 ${height}`} role="img" aria-labelledby={`${canvasId}-title ${canvasId}-desc`} className={expanded ? 'block w-full min-w-[760px]' : 'mx-auto block h-auto max-w-full'} style={{ fontFamily: 'inherit', ...(!expanded ? { width: `${previewWidth}px` } : {}) }}>
          <title id={`${canvasId}-title`}>{title}</title>
          <desc id={`${canvasId}-desc`}>{description}</desc>
          <defs>
            <marker id={`${canvasId}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
            <marker id={`${canvasId}-arrow-change`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#ea580c" />
            </marker>
          </defs>
          <rect width="960" height={height} fill="white" />
          {children}
        </svg>
      </DiagramId.Provider>
    );
  };

  return (
    <div>
      <button type="button" onClick={() => dialogRef.current?.showModal()} aria-label={`${title} 크게 보기`} className="block w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
        {renderDiagram(false)}
        <span className="mt-2 flex items-center justify-end gap-1.5 text-xs text-muted-foreground"><Maximize2 className="h-3.5 w-3.5" aria-hidden />크게 보기</span>
      </button>
      <dialog ref={dialogRef} aria-labelledby={`${id}-dialog-title`} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }} className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-6xl overflow-auto border-0 bg-background p-0 text-foreground backdrop:bg-black/50">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-background px-5 py-4">
          <h2 id={`${id}-dialog-title`} className="text-base font-semibold">{title}</h2>
          <button type="button" onClick={() => dialogRef.current?.close()} aria-label="다이어그램 닫기" className="shrink-0 p-1 text-muted-foreground hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"><X className="h-5 w-5" aria-hidden /></button>
        </div>
        <div className="overflow-x-auto overscroll-x-contain p-4" tabIndex={0} aria-label={`${title} · 가로 스크롤 가능`}>
          {renderDiagram(true)}
        </div>
      </dialog>
    </div>
  );
}

export function Group({ x, y, width, height, label, tone = 'slate' }: {
  x: number; y: number; width: number; height: number; label: string; tone?: Tone;
}) {
  const palette = colors[tone];
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="4" fill={palette.tint} fillOpacity="0.65" stroke={palette.border} strokeDasharray="5 4" />
      <text x={x + 18} y={y + 28} fontSize="12" fontWeight="700" fill={palette.accent} letterSpacing="1.2">{label}</text>
    </g>
  );
}

export function Card({ x, y, width, height, title, lines, icon: Icon, tone = 'teal', titleSize = 17 }: {
  x: number; y: number; width: number; height: number; title: string;
  lines: string[]; icon: LucideIcon; tone?: Tone; titleSize?: number;
}) {
  const palette = colors[tone];
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="4" fill="white" stroke={palette.border} />
      <Icon x={x + 21} y={y + 20} width={18} height={18} color={palette.accent} strokeWidth={1.8} aria-hidden />
      <text x={x + 52} y={y + 34} fontSize={titleSize} fontWeight="700" fill="#163d3b">{title}</text>
      {lines.map((line, index) => (
        <text key={line} x={x + 18} y={y + 62 + index * 22} fontSize="14" fill="#536575">{line}</text>
      ))}
    </g>
  );
}

export function Edge({ d, label, x, y, bidirectional = false, highlighted = false }: { d: string; label?: string; x?: number; y?: number; bidirectional?: boolean; highlighted?: boolean }) {
  const id = useContext(DiagramId);
  const marker = `url(#${id}-arrow${highlighted ? '-change' : ''})`;
  return (
    <g>
      <path d={d} fill="none" stroke={highlighted ? '#ea580c' : '#64748b'} strokeWidth="1.6" strokeLinejoin="round" markerStart={bidirectional ? marker : undefined} markerEnd={marker} />
      {label && <text x={x} y={y} textAnchor="middle" fontSize="12" fontWeight="500" fill="#536575" stroke="white" strokeWidth="5" paintOrder="stroke">{label}</text>}
    </g>
  );
}

export function DiagramCard({ title, subtitle, children, caption, headingLevel = 3 }: {
  number: string; title: string; subtitle: string; children: ReactNode; caption: string; headingLevel?: 3 | 4;
}) {
  const Heading = headingLevel === 4 ? 'h4' : 'h3';
  return (
    <figure className="min-w-0 bg-white">
      <div className="mb-4">
        <Heading className="text-lg font-semibold leading-7">{title}</Heading>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{subtitle}</p>
      </div>
      {children}
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}



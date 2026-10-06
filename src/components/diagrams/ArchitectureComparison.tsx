'use client';

import { type ArchitectureChange, type ArchitectureFlow } from '@/data/projects';
import { Canvas, Edge } from './DiagramPrimitives';

const NODE_HEIGHT = 80;
const ROW_GAP = 112;

function layout(flow: ArchitectureFlow, columnX: number) {
  return flow.nodes.map((node, index) => {
    const row = node.row ?? index;
    const siblings = flow.nodes.filter((other, otherIndex) => (other.row ?? otherIndex) === row);
    const column = siblings.findIndex((other) => other.id === node.id);
    const width = (432 - (siblings.length - 1) * 16) / siblings.length;
    return { ...node, x: columnX + column * (width + 16), y: 64 + row * ROW_GAP, width };
  });
}

function Flow({ flow, columnX, after }: { flow: ArchitectureFlow; columnX: number; after: boolean }) {
  const nodes = layout(flow, columnX);
  const connections = flow.edges ?? nodes.slice(1).map((node, index): [string, string] => [nodes[index].id, node.id]);

  return (
    <g>
      <text x={columnX} y={30} fontSize="21" fontWeight="700" fill="#334155">{after ? 'AFTER' : 'BEFORE'}</text>
      <text x={columnX + 100} y={29} fontSize="14" fill="#64748b">{flow.label ?? (after ? '변경 후' : '변경 전')}</text>
      {connections.map(([from, to]) => {
        const source = nodes.find((node) => node.id === from);
        const target = nodes.find((node) => node.id === to);
        if (!source || !target) return null;
        const sourceX = source.x + source.width / 2;
        const targetX = target.x + target.width / 2;
        const sourceY = source.y + NODE_HEIGHT;
        const middleY = (sourceY + target.y) / 2;
        return <Edge key={`${from}-${to}`} d={`M ${sourceX} ${sourceY} V ${middleY} H ${targetX} V ${target.y}`} highlighted={after && !!(source.changed || target.changed)} />;
      })}
      {nodes.map((node) => {
        const changed = after && node.changed;
        const detailLines = node.detail.split('\n');
        return (
          <g key={node.id}>
            <rect x={node.x} y={node.y} width={node.width} height={NODE_HEIGHT} rx="3" fill={changed ? '#fff7ed' : '#f8fafc'} stroke={changed ? '#f97316' : '#cbd5e1'} strokeWidth={changed ? 1.8 : 1} />
            <text x={node.x + 18} y={node.y + 31} fontSize={node.width < 300 ? 16 : 18} fontWeight="700" fill={changed ? '#9a3412' : '#334155'}>{node.title}</text>
            {detailLines.map((line, index) => (
              <text key={`${node.id}-${index}`} x={node.x + 18} y={node.y + (detailLines.length > 1 ? 49 + index * 19 : 58)} fontSize={node.width < 300 ? 13 : detailLines.length > 1 ? 14 : 15} fill="#64748b">{line}</text>
            ))}
            {changed && <text x={node.x + node.width - 12} y={node.y + 15} textAnchor="end" fontSize="10" fontWeight="600" fill="#c2410c">변경</text>}
          </g>
        );
      })}
    </g>
  );
}

export default function ArchitectureComparison({ id, title, change }: { id: string; title: string; change: ArchitectureChange }) {
  const maxRow = Math.max(...[change.before, change.after].flatMap((flow) => flow.nodes.map((node, index) => node.row ?? index)));
  const height = 168 + maxRow * ROW_GAP;
  const describe = (flow: ArchitectureFlow) => flow.nodes.map((node) => `${node.title}: ${node.detail}${node.changed ? ' (추가·변경)' : ''}`).join('; ');

  return (
    <figure className="min-w-0 bg-white">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h5 className="text-base font-semibold">변경 전 · 변경 후</h5>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="h-2 w-2 bg-orange-500" aria-hidden />주황색: 추가·변경한 부분</p>
      </div>
      <Canvas id={id} height={height} title={`${title} 구조 변경 비교`} description={`변경 전: ${describe(change.before)}. 변경 후: ${describe(change.after)}. ${change.caption}`}>
        <line x1="480" y1="12" x2="480" y2={height - 16} stroke="#e2e8f0" />
        <Flow flow={change.before} columnX={24} after={false} />
        <Flow flow={change.after} columnX={504} after />
      </Canvas>
      <figcaption className="sr-only">{change.caption}</figcaption>
    </figure>
  );
}

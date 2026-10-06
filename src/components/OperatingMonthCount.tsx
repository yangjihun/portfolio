'use client';

import { useSyncExternalStore } from 'react';
import { getOperatingMonthCount, getSeoulMonthIndex } from '@/lib/operating-month';

function subscribeToCurrentMonth(onChange: () => void) {
  const timer = window.setInterval(onChange, 60_000);
  window.addEventListener('focus', onChange);
  window.addEventListener('pageshow', onChange);
  document.addEventListener('visibilitychange', onChange);
  return () => {
    window.clearInterval(timer);
    window.removeEventListener('focus', onChange);
    window.removeEventListener('pageshow', onChange);
    document.removeEventListener('visibilitychange', onChange);
  };
}

// 정적 빌드에 당시의 개월 수가 고정되지 않도록 서버에서는 날짜 값 대신 자리만 둔다.
function getServerMonth() {
  return null;
}

export default function OperatingMonthCount({ startMonth, unit = '개월째' }: { startMonth: string; unit?: string }) {
  const currentMonth = useSyncExternalStore<number | null>(subscribeToCurrentMonth, getSeoulMonthIndex, getServerMonth);
  const months = currentMonth === null ? null : getOperatingMonthCount(startMonth, currentMonth);

  return (
    <span aria-live="polite" aria-atomic="true">
      {months === null ? '—' : months === 0 ? '예정' : months}
      {months !== null && months > 0 && <span className="ml-1 text-sm font-normal tracking-normal sm:text-2xl">{unit}</span>}
    </span>
  );
}

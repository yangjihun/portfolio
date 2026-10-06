const seoulMonthFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: 'numeric',
});

/** 사용자·서버의 시간대와 무관하게 한국의 현재 연월을 비교한다. */
export function getSeoulMonthIndex(date = new Date()): number {
  const parts = seoulMonthFormatter.formatToParts(date);
  const year = Number(parts.find((part) => part.type === 'year')?.value);
  const month = Number(parts.find((part) => part.type === 'month')?.value);
  return year * 12 + month - 1;
}

/** 시작 월을 1개월째로 센다. 정확한 시작 일을 모르는 경우 완료 개월 수와 구분한다. */
export function getOperatingMonthCount(startMonth: string, currentMonthIndex: number): number {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(startMonth)) {
    throw new Error(`Invalid operating start month: ${startMonth}`);
  }
  const [year, month] = startMonth.split('-').map(Number);
  return Math.max(0, currentMonthIndex - (year * 12 + month - 1) + 1);
}

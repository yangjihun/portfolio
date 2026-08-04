import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-32 text-center">
      <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        404
      </p>
      <h1 className="mb-4 text-3xl font-bold md:text-4xl">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mb-10 text-muted-foreground">
        요청하신 페이지가 존재하지 않거나 주소가 변경되었습니다.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
        >
          홈으로
        </Link>
        <Link
          href="/projects"
          className="rounded-lg border border-border bg-background px-8 py-3 font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-primary/5"
        >
          프로젝트 보기
        </Link>
      </div>
    </div>
  );
}

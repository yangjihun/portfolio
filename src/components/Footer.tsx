export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} 양지훈. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/yangjihun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              GitHub
            </a>
            <a
              href="mailto:yjhn0410@gmail.com"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


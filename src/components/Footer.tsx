export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-400">
            © {currentYear} 양지훈. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/yangjihun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              GitHub
            </a>
            <a
              href="mailto:yangjihun@example.com"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


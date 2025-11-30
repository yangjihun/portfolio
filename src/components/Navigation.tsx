'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: '홈' },
  { href: '/about', label: '소개' },
  { href: '/projects', label: '프로젝트' },
  { href: '/contact', label: '연락처' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          양지훈
        </Link>
        <ul className="flex gap-1 md:gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href === '/projects' && pathname.startsWith('/projects'));
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium transition-colors hover:text-white md:px-4 md:text-base',
                    isActive ? 'text-white' : 'text-gray-400'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}


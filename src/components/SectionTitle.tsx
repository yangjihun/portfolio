'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
}

export default function SectionTitle({ children, subtitle }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12 text-center"
    >
      <h2 className="mb-3 text-3xl font-bold md:text-4xl">{children}</h2>
      {subtitle && <p className="text-gray-400">{subtitle}</p>}
    </motion.div>
  );
}


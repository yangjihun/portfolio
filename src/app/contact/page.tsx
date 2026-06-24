'use client';

import { motion } from 'framer-motion';
import { Mail, Code2, Globe, BookOpen } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';

export default function ContactPage() {
  const contacts = [
    {
      label: 'Email',
      value: 'yjhn0410@gmail.com',
      href: 'mailto:yjhn0410@gmail.com',
      description: '이메일로 연락주세요',
      icon: Mail,
    },
    {
      label: 'GitHub',
      value: 'github.com/yangjihun',
      href: 'https://github.com/yangjihun',
      description: '코드와 프로젝트를 확인하세요',
      icon: Code2,
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/yangjihun',
      href: 'https://linkedin.com/in/yangjihun',
      description: '프로페셔널 네트워크',
      icon: Globe,
    },
    {
      label: 'Blog',
      value: 'velog.io/@yangjihun',
      href: 'https://velog.io/@yangjihun',
      description: '기술 블로그',
      icon: BookOpen,
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <SectionTitle subtitle="언제든지 편하게 연락주세요">
        연락처
      </SectionTitle>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
          프로젝트 협업, 채용 제안, 기술 문의 등 어떤 내용이든 환영합니다.
          <br />
          아래 연락처를 통해 언제든지 연락주시면 빠르게 답변드리겠습니다.
        </p>
      </motion.div>

      <div className="divide-y divide-border rounded-lg border border-border">
        {contacts.map((contact, index) => (
          <motion.a
            key={contact.label}
            href={contact.href}
            target={contact.href.startsWith('http') ? '_blank' : undefined}
            rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="group flex items-center justify-between px-8 py-6 transition-colors hover:bg-muted/60"
          >
            <div className="flex items-center gap-4">
              <contact.icon className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {contact.label}
                </span>
                <p className="mt-1 text-sm text-muted-foreground">{contact.description}</p>
              </div>
            </div>
            <span className="text-base font-medium text-foreground transition-colors group-hover:text-primary">
              {contact.value}
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}


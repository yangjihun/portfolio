'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/SectionTitle';

export default function ContactPage() {
  const contacts = [
    {
      label: 'Email',
      value: 'yjhn0410@gmail.com',
      href: 'mailto:yjhn0410@gmail.com',
      description: '이메일로 연락주세요',
      icon: '📧',
    },
    {
      label: 'GitHub',
      value: 'github.com/yangjihun',
      href: 'https://github.com/yangjihun',
      description: '코드와 프로젝트를 확인하세요',
      icon: '💻',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/yangjihun',
      href: 'https://linkedin.com/in/yangjihun',
      description: '프로페셔널 네트워크',
      icon: '🔗',
    },
    {
      label: 'Blog',
      value: 'velog.io/@yangjihun',
      href: 'https://velog.io/@yangjihun',
      description: '기술 블로그',
      icon: '✍️',
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
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300">
          프로젝트 협업, 채용 제안, 기술 문의 등 어떤 내용이든 환영합니다.
          <br />
          아래 연락처를 통해 언제든지 연락주시면 빠르게 답변드리겠습니다.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {contacts.map((contact, index) => (
          <motion.a
            key={contact.label}
            href={contact.href}
            target={contact.href.startsWith('http') ? '_blank' : undefined}
            rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group rounded-lg border border-gray-800 bg-gray-900/50 p-6 transition-all hover:border-gray-700 hover:bg-gray-900/80"
          >
            <div className="mb-3 text-4xl">{contact.icon}</div>
            <h3 className="mb-2 text-xl font-bold group-hover:text-white">
              {contact.label}
            </h3>
            <p className="mb-2 text-sm text-gray-400">{contact.description}</p>
            <p className="break-all text-gray-300 group-hover:text-white">
              {contact.value}
            </p>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 rounded-lg border border-gray-800 bg-gray-900/50 p-8 text-center"
      >
        <h3 className="mb-4 text-2xl font-bold">함께 일하고 싶으신가요?</h3>
        <p className="mb-6 text-gray-300">
          새로운 기회와 도전을 항상 환영합니다.
          <br />
          이메일로 연락주시면 빠르게 회신드리겠습니다.
        </p>
        <a
          href="mailto:yangjihun@example.com"
          className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-black transition-all hover:bg-gray-200"
        >
          이메일 보내기
        </a>
      </motion.div>
    </div>
  );
}


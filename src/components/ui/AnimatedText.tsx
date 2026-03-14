'use client'

export default function AnimatedText({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={className}>{children}</span>
}

'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { TESTIMONIALS } from '@/lib/data'

const BRAND_COLORS: Record<string, string> = {
  'CUPRA': '#C8A96E',
  'SEAT': '#F20000',
  'ŠKODA': '#4BA82E',
  'MAZDA': '#E2001A',
  'HYUNDAI': '#4B9CD3',
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-title',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )
      gsap.fromTo('.testimonial-cards',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full section-padding"
      style={{ background: '#0f0f0f', borderTop: '1px solid #1a1a1a' }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="section-number">Témoignages</span>
            <div className="divider-line" />
            <span className="text-[#333] text-xs tracking-widest uppercase">
              Ils nous font confiance
            </span>
          </div>
          <h2 className="testimonial-title text-display-sm text-white max-w-xl">
            La satisfaction,<br />
            <em className="not-italic font-black text-[#dd3d53]">notre priorité</em>
          </h2>
        </div>

        {/* Cards témoignages */}
        <div className="testimonial-cards grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1a1a]">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-[#0f0f0f] p-8 md:p-10 group hover:bg-[#111] transition-colors duration-300 cursor-default"
              onMouseEnter={() => setActive(i)}
            >
              {/* Guillemets décoratifs */}
              <div
                className="text-[#1e1e1e] font-black mb-4 leading-none select-none"
                style={{ fontSize: '5rem' }}
              >
                &ldquo;
              </div>

              {/* Texte */}
              <p className="text-[#888] text-sm leading-relaxed mb-8 group-hover:text-[#aaa] transition-colors duration-300">
                {t.text}
              </p>

              {/* Auteur */}
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <p className="text-white font-bold text-sm">{t.author}</p>
                  <p className="text-[#444] text-xs mt-0.5">Client Groupe Milanesio</p>
                </div>
                <span
                  className="text-[10px] font-black tracking-widest px-2 py-1 border"
                  style={{
                    color: BRAND_COLORS[t.brand],
                    borderColor: `${BRAND_COLORS[t.brand]}40`,
                    background: `${BRAND_COLORS[t.brand]}10`,
                  }}
                >
                  {t.brand}
                </span>
              </div>

              {/* Étoiles */}
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="12" height="12" viewBox="0 0 12 12" fill="#dd3d53">
                    <path d="M6 1l1.5 3h3l-2.5 2 1 3L6 7.5 3 9l1-3L1.5 4h3z"/>
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Google */}
        <div className="mt-12 flex flex-wrap items-center gap-8 pt-8 border-t border-[#1a1a1a]">
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 12 12" fill="#dd3d53">
                  <path d="M6 1l1.5 3h3l-2.5 2 1 3L6 7.5 3 9l1-3L1.5 4h3z"/>
                </svg>
              ))}
            </div>
            <span className="text-white font-bold">4.8/5</span>
            <span className="text-[#444] text-sm">sur Google</span>
          </div>
          <div className="w-px h-6 bg-[#1a1a1a] hidden md:block" />
          <span className="text-[#444] text-sm">Basé sur +500 avis clients</span>
        </div>
      </div>
    </section>
  )
}

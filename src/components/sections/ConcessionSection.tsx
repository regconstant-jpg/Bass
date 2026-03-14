'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { CONCESSIONS } from '@/lib/data'

const BRAND_COLORS: Record<string, string> = {
  'CUPRA': '#C8A96E',
  'SEAT': '#F20000',
  'ŠKODA': '#4BA82E',
  'MAZDA': '#E2001A',
  'HYUNDAI': '#002C5F',
}

export default function ConcessionSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Titre
      gsap.fromTo('.concession-title',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )

      // Cards en cascade
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="concessions"
      className="w-full section-padding"
      style={{ background: '#0a0a0a' }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="section-number">Nos concessions</span>
            <div className="divider-line" />
            <span className="text-[#333] text-xs tracking-widest uppercase">
              Sud de la France
            </span>
          </div>
          <h2 className="concession-title text-display-sm text-white max-w-2xl">
            6 concessions à votre<br />
            <em className="not-italic font-black text-[#dd3d53]">service</em>
          </h2>
        </div>

        {/* Grid des concessions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1a1a]">
          {CONCESSIONS.map((concession, i) => (
            <div
              key={i}
              ref={el => { if (el) cardsRef.current[i] = el }}
              className="group relative bg-[#0a0a0a] p-8 cursor-pointer overflow-hidden transition-all duration-500 hover:bg-[#111]"
            >
              {/* Ligne rouge en haut au hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#dd3d53] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

              {/* Numéro */}
              <div
                className="absolute top-4 right-6 font-black text-[#1a1a1a] group-hover:text-[#1e1e1e] transition-colors duration-500 select-none pointer-events-none"
                style={{ fontSize: '5rem', lineHeight: 1, letterSpacing: '-0.05em' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Contenu */}
              <div className="relative z-10">
                {/* Ville */}
                <h3
                  className="text-white font-black mb-1 group-hover:text-[#dd3d53] transition-colors duration-300"
                  style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', letterSpacing: '-0.02em' }}
                >
                  {concession.city}
                </h3>

                {/* Adresse */}
                <p className="text-[#444] text-xs mb-6 leading-relaxed">
                  {concession.address}
                </p>

                {/* Marques badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {concession.brands.map((brand) => (
                    <span
                      key={brand}
                      className="text-[10px] font-bold tracking-widest px-2 py-1 border"
                      style={{
                        color: BRAND_COLORS[brand] || '#fff',
                        borderColor: `${BRAND_COLORS[brand]}40` || '#333',
                        background: `${BRAND_COLORS[brand]}10` || 'transparent',
                      }}
                    >
                      {brand}
                    </span>
                  ))}
                </div>

                {/* Téléphone */}
                <a
                  href={`tel:${concession.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-[#555] hover:text-white transition-colors duration-200 text-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2h3l1.5 3.5-1.5 1a7 7 0 003.5 3.5l1-1.5L13 10v3a1 1 0 01-1 1A11 11 0 011 3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {concession.phone}
                </a>

                {/* Flèche CTA */}
                <div className="mt-6 flex items-center gap-2 text-[#333] group-hover:text-[#dd3d53] transition-colors duration-300">
                  <span className="text-xs tracking-widest uppercase font-medium">
                    Voir la concession
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transform group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer de section */}
        <div className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-[#1a1a1a]">
          <p className="text-[#444] text-sm max-w-md">
            Toutes nos concessions sont ouvertes du lundi au vendredi 8h–19h, samedi 9h–19h.
          </p>
          <a href="mailto:contact@cap-milanesio.fr" className="btn-outline text-sm py-3 px-6">
            contact@cap-milanesio.fr
          </a>
        </div>
      </div>
    </section>
  )
}

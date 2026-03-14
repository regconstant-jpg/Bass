'use client'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const BRANDS = ['CUPRA', 'SEAT', 'ŠKODA', 'MAZDA', 'HYUNDAI']
const ALL_BRANDS = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS]

export default function BrandsStrip() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const totalWidth = track.scrollWidth / 2

    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 25,
      ease: 'none',
      repeat: -1,
    })

    // Ralentissement au hover
    const section = track.closest('section')
    const slowDown = () => gsap.to(tween, { timeScale: 0.3, duration: 0.5 })
    const speedUp = () => gsap.to(tween, { timeScale: 1, duration: 0.5 })

    section?.addEventListener('mouseenter', slowDown)
    section?.addEventListener('mouseleave', speedUp)

    return () => {
      gsap.killTweensOf(track)
      section?.removeEventListener('mouseenter', slowDown)
      section?.removeEventListener('mouseleave', speedUp)
    }
  }, [])

  return (
    <section
      className="w-full py-14 overflow-hidden"
      style={{ background: '#0a0a0a', borderBottom: '1px solid #1a1a1a' }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 mb-10">
        <div className="flex items-center gap-4">
          <span className="section-number">Nos marques</span>
          <div className="divider-line" />
          <span className="text-[#333] text-xs tracking-widest uppercase">
            5 constructeurs partenaires
          </span>
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0a0a0a, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0a0a0a, transparent)' }}
        />

        <div
          ref={trackRef}
          className="flex items-center gap-16 md:gap-24"
          style={{ width: 'max-content' }}
        >
          {ALL_BRANDS.map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 text-[#2a2a2a] hover:text-[#dd3d53] transition-colors duration-300 cursor-default select-none"
              style={{
                fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                fontWeight: 900,
                letterSpacing: '0.15em',
              }}
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

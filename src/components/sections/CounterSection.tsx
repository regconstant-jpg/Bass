'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { STATS } from '@/lib/data'

export default function CounterSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const countersRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const counters = countersRef.current

    counters.forEach((counter, i) => {
      const valueEl = counter.querySelector('.counter-value') as HTMLElement
      const stat = STATS[i]
      if (!valueEl || !stat) return

      // Entrée du bloc
      gsap.fromTo(counter,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )

      // Animation du compteur
      const counter_obj = { val: 0 }
      gsap.to(
        counter_obj,
        {
          val: stat.value,
          duration: 2,
          delay: i * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          onUpdate: function() {
            const current = Math.round(this.targets()[0].val)
            valueEl.textContent = current >= 1000
              ? current.toLocaleString('fr-FR')
              : String(current)
          }
        }
      )
    })

    // Ligne horizontale animée
    gsap.fromTo('.counter-line',
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    )

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 md:py-24"
      style={{ background: '#0f0f0f', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={i}
              ref={el => { if (el) countersRef.current[i] = el }}
              className="flex flex-col items-center justify-center py-8 md:py-0 relative"
              style={{
                borderRight: i < STATS.length - 1 ? '1px solid #1e1e1e' : 'none'
              }}
            >
              {/* Valeur */}
              <div className="flex items-end gap-1">
                <span
                  className="counter-value text-white font-black tabular-nums"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1, letterSpacing: '-0.03em' }}
                >
                  0
                </span>
                {stat.suffix && (
                  <span
                    className="text-[#dd3d53] font-black mb-1"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', lineHeight: 1 }}
                  >
                    {stat.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className="mt-3 text-[#555] text-xs tracking-widest uppercase font-medium">
                {stat.label}
              </span>

              {/* Ligne décorative sous le chiffre */}
              <div className="mt-4 w-8 h-[2px] bg-[#dd3d53] opacity-60" />
            </div>
          ))}
        </div>
        <div className="mt-12 relative">
          <div
            className="counter-line h-[1px] bg-gradient-to-r from-[#dd3d53] via-[#dd3d53] to-transparent origin-left"
            style={{ transformOrigin: 'left' }}
          />
        </div>
      </div>
    </section>
  )
}

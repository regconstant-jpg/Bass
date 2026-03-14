'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { HERO_PHRASES } from '@/lib/data'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const phrasesRef = useRef<(HTMLDivElement | null)[]>([])
  const flashRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Animation d'entrée — la vidéo scale depuis 1.1 vers 1
      gsap.fromTo('.hero-video',
        { scale: 1.1 },
        { scale: 1, duration: 2, ease: 'power2.out' }
      )

      // Surtitre glisse depuis la gauche
      gsap.fromTo('.hero-surtitre',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1, delay: 0.8, ease: 'power2.out' }
      )

      // Boutons montent
      gsap.fromTo('.hero-cta',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.2, stagger: 0.15, ease: 'power2.out' }
      )

      // Pour chaque phrase, créer une ScrollTrigger
      const totalPhrases = HERO_PHRASES.length
      // Section = 400vh, chaque phrase = 80vh de zone de scroll
      const segmentVh = 80

      phrasesRef.current.forEach((phrase, i) => {
        if (!phrase) return

        if (i === 0) {
          // Phrase 0 : visible par défaut, sort vers le haut au scroll
          gsap.to(phrase, {
            opacity: 0,
            y: -80,
            scale: 0.95,
            filter: 'blur(8px)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${segmentVh * 0.6}px top`,
              end: `${segmentVh}px top`,
              scrub: 0.8,
            }
          })
        } else {
          // Phrases suivantes : entrée spectaculaire puis sortie
          const startPx = i * segmentVh
          const midPx = startPx + segmentVh * 0.4
          const endPx = startPx + segmentVh

          // ENTRÉE — depuis le bas avec scale et blur
          gsap.fromTo(phrase,
            {
              opacity: 0,
              y: 100,
              scale: 1.05,
              filter: 'blur(12px)',
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: `${startPx}px top`,
                end: `${midPx}px top`,
                scrub: 0.6,
              }
            }
          )

          // SORTIE — vers le haut avec blur (sauf dernière phrase)
          if (i < totalPhrases - 1) {
            gsap.to(phrase, {
              opacity: 0,
              y: -80,
              scale: 0.95,
              filter: 'blur(8px)',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: `${midPx + segmentVh * 0.2}px top`,
                end: `${endPx}px top`,
                scrub: 0.8,
              }
            })
          }

          // FLASH entre les phrases — overlay bref
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: `${startPx - 10}px top`,
            end: `${startPx + 30}px top`,
            scrub: true,
            onUpdate: (self) => {
              if (flashRef.current) {
                const p = self.progress
                // Triangle : monte puis redescend
                const intensity = p < 0.5 ? p * 2 : (1 - p) * 2
                flashRef.current.style.opacity = String(intensity * 0.4)
              }
            }
          })
        }
      })

      // Overlay couleur qui change subtilement entre phrases
      gsap.to(overlayRef.current, {
        background: 'linear-gradient(to bottom, rgba(80,10,20,0.4) 0%, rgba(10,10,10,0.2) 50%, rgba(10,10,10,0.8) 100%)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `${totalPhrases * segmentVh * 0.5}px top`,
          scrub: 1,
        }
      })
      gsap.to(overlayRef.current, {
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.2) 50%, rgba(10,10,10,0.9) 100%)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `${totalPhrases * segmentVh * 0.5}px top`,
          end: `${totalPhrases * segmentVh}px top`,
          scrub: 1,
        }
      })

      // Compteur scroll-driven
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `${totalPhrases * segmentVh}px top`,
        scrub: true,
        onUpdate: (self) => {
          const index = Math.min(
            Math.floor(self.progress * totalPhrases),
            totalPhrases - 1
          )
          const counterEl = document.querySelector('.hero-counter-current')
          const progressEl = document.querySelector('.hero-progress-bar') as HTMLElement
          if (counterEl) counterEl.textContent = String(index + 1).padStart(2, '0')
          if (progressEl) {
            progressEl.style.width = `${((index + 1) / totalPhrases) * 100}%`
          }
        }
      })

      // Parallax vidéo subtil
      gsap.to('.hero-video', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const totalHeight = `${HERO_PHRASES.length * 80 + 100}vh`

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: totalHeight }}
    >
      {/* Sticky container */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#0a0a0a]"
      >
        {/* Vidéo */}
        <video
          className="hero-video absolute inset-0 w-full h-full object-cover"
          src="https://gowhvltdclhlkdjjiwnb.supabase.co/storage/v1/object/public/Video/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* Overlay principal */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-[1] transition-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.2) 40%, rgba(10,10,10,0.7) 80%, rgba(10,10,10,1) 100%)'
          }}
        />

        {/* Flash de transition entre phrases */}
        <div
          ref={flashRef}
          className="absolute inset-0 z-[2] bg-white pointer-events-none"
          style={{ opacity: 0 }}
        />

        {/* Ligne rouge gauche */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-28 bg-[#dd3d53] z-[3]" />

        {/* Contenu */}
        <div className="absolute inset-0 z-[3] flex flex-col justify-center px-5 sm:px-8 md:px-16 lg:px-24 max-w-[1400px] mx-auto w-full">

          {/* Surtitre */}
          <div className="hero-surtitre flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
            <span className="section-number">Groupe Milanesio</span>
            <div className="divider-line hidden sm:inline-block" />
            <span className="text-[#707070] text-[10px] sm:text-xs tracking-widest uppercase">
              5 marques · 6 concessions
            </span>
          </div>

          {/* Phrases superposées */}
          <div className="relative" style={{ height: 'clamp(5rem, 9vw, 10rem)' }}>
            {HERO_PHRASES.map((phrase, i) => (
              <div
                key={i}
                ref={el => { phrasesRef.current[i] = el }}
                className="absolute top-0 left-0 text-display text-white leading-none max-w-[90vw] sm:max-w-none"
                style={{
                  opacity: i === 0 ? 1 : 0,
                  willChange: 'transform, opacity, filter',
                }}
              >
                {phrase}
              </div>
            ))}
          </div>

          {/* Sous-titre */}
          <p className="mt-4 sm:mt-6 text-[#a0a0a0] text-xs sm:text-sm md:text-base max-w-xl leading-relaxed">
            Avignon · Aix-en-Provence · Marignane · Marseille · Saint-Victoret · Salon-de-Provence
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-10">
            <a href="#vehicules" className="hero-cta btn-primary justify-center sm:justify-start">
              Découvrir nos véhicules
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contact" className="hero-cta btn-outline justify-center sm:justify-start">
              Nous contacter
            </a>
          </div>
        </div>

        {/* Compteur */}
        <div className="absolute bottom-8 right-8 md:right-16 z-[4] flex items-center gap-3">
          <span className="hero-counter-current text-[#dd3d53] text-sm font-bold tabular-nums">01</span>
          <div className="w-20 h-[1px] bg-[#2a2a2a]">
            <div
              className="hero-progress-bar h-full bg-[#dd3d53]"
              style={{ width: `${(1 / HERO_PHRASES.length) * 100}%`, transition: 'none' }}
            />
          </div>
          <span className="text-[#444] text-sm tabular-nums">
            {String(HERO_PHRASES.length).padStart(2, '0')}
          </span>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2">
          <span className="text-[#555] text-xs tracking-widest uppercase">Défiler</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#dd3d53] to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  )
}

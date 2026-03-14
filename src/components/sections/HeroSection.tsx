'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { HERO_PHRASES } from '@/lib/data'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const phrasesRef = useRef<(HTMLDivElement | null)[]>([])
  const blackOverlayRef = useRef<HTMLDivElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    // Attendre que la vidéo soit prête
    const initScrubbing = () => {
      const duration = video.duration
      if (!duration || isNaN(duration)) return

      const ctx = gsap.context(() => {

        // === 1. ANIMATION D'ENTRÉE ===
        gsap.fromTo(video,
          { scale: 1.08, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.8, ease: 'power2.out' }
        )
        gsap.fromTo('.hero-surtitre',
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 1, delay: 0.8, ease: 'power2.out' }
        )
        gsap.fromTo('.hero-cta',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: 1.3, stagger: 0.15, ease: 'power2.out' }
        )

        // === 2. VIDEO SCRUBBING (0% → 80% du scroll) ===
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '80% top',
          scrub: 0.3,
          onUpdate: (self) => {
            if (video && duration) {
              video.currentTime = self.progress * duration
            }
          }
        })

        // === 3. PHRASES AU SCROLL ===
        const totalPhrases = HERO_PHRASES.length
        phrasesRef.current.forEach((phrase, i) => {
          if (!phrase) return

          const segStart = (i / totalPhrases) * 0.75
          const segMid = segStart + (0.75 / totalPhrases) * 0.45
          const segEnd = segStart + (0.75 / totalPhrases)

          if (i === 0) {
            // Première phrase : sortie seulement
            gsap.to(phrase, {
              opacity: 0,
              y: -60,
              filter: 'blur(8px)',
              scrollTrigger: {
                trigger: section,
                start: `${segMid * 100}% top`,
                end: `${segEnd * 100}% top`,
                scrub: 0.5,
              }
            })
          } else {
            // Entrée spectaculaire
            gsap.fromTo(phrase,
              { opacity: 0, y: 80, filter: 'blur(12px)', scale: 1.04 },
              {
                opacity: 1, y: 0, filter: 'blur(0px)', scale: 1,
                scrollTrigger: {
                  trigger: section,
                  start: `${segStart * 100}% top`,
                  end: `${segMid * 100}% top`,
                  scrub: 0.5,
                }
              }
            )
            // Sortie (sauf dernière)
            if (i < totalPhrases - 1) {
              gsap.to(phrase, {
                opacity: 0, y: -60, filter: 'blur(8px)',
                scrollTrigger: {
                  trigger: section,
                  start: `${(segMid + 0.02) * 100}% top`,
                  end: `${segEnd * 100}% top`,
                  scrub: 0.5,
                }
              })
            }
          }
        })

        // === 4. EXPLOSION FINALE (80% → 95%) ===
        // Zoom + blur sur la vidéo
        gsap.to(videoWrapRef.current, {
          scale: 1.35,
          filter: 'blur(20px)',
          scrollTrigger: {
            trigger: section,
            start: '80% top',
            end: '95% top',
            scrub: 0.8,
          }
        })

        // Fondu au noir
        gsap.to(blackOverlayRef.current, {
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: '88% top',
            end: '98% top',
            scrub: 0.5,
          }
        })

        // Compteur scroll-driven
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '80% top',
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

      }, sectionRef)

      return () => ctx.revert()
    }

    // Init quand la vidéo est chargée
    if (video.readyState >= 2) {
      initScrubbing()
    } else {
      video.addEventListener('loadeddata', initScrubbing, { once: true })
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '600vh' }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#0a0a0a]">

        {/* Wrapper vidéo — c'est lui qui zoom/blur */}
        <div
          ref={videoWrapRef}
          className="absolute inset-0 w-full h-full"
          style={{ transformOrigin: 'center center', willChange: 'transform, filter' }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src="/videos/hero-scrub.mp4"
            muted
            playsInline
            preload="auto"
          />
        </div>

        {/* Overlay dégradé permanent */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.15) 40%, rgba(10,10,10,0.6) 80%, rgba(10,10,10,1) 100%)'
          }}
        />

        {/* Overlay noir pour la transition finale */}
        <div
          ref={blackOverlayRef}
          className="absolute inset-0 z-[2] bg-[#0a0a0a] pointer-events-none"
          style={{ opacity: 0 }}
        />

        {/* Ligne rouge gauche */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-28 bg-[#dd3d53] z-[3]" />

        {/* Contenu */}
        <div className="absolute inset-0 z-[3] flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-[1400px] mx-auto w-full">

          {/* Surtitre */}
          <div className="hero-surtitre flex items-center gap-4 mb-8">
            <span className="section-number">Groupe Milanesio</span>
            <div className="divider-line" />
            <span className="text-[#707070] text-xs tracking-widest uppercase">
              5 marques · 6 concessions
            </span>
          </div>

          {/* Phrases superposées */}
          <div className="relative" style={{ height: 'clamp(3rem, 9vw, 10rem)' }}>
            {HERO_PHRASES.map((phrase, i) => (
              <div
                key={i}
                ref={el => { phrasesRef.current[i] = el }}
                className="absolute top-0 left-0 text-display text-white leading-none"
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
          <p className="mt-6 text-[#a0a0a0] text-sm md:text-base max-w-xl leading-relaxed">
            Avignon · Aix-en-Provence · Marignane · Marseille · Saint-Victoret · Salon-de-Provence
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mt-10">
            <a href="#vehicules" className="hero-cta btn-primary">
              Découvrir nos véhicules
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contact" className="hero-cta btn-outline">
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

        {/* Scroll indicator — disparaît après le premier scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2">
          <span className="text-[#555] text-xs tracking-widest uppercase">Défiler</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#dd3d53] to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  )
}

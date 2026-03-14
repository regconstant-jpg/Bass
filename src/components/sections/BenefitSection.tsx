'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface Benefit {
  number: string
  title: string
  titleBold: string
  description: string
  youtubeId: string
  cta: string
}

interface Props {
  benefit: Benefit
  reverse?: boolean
  videoSrc: string
}

export default function BenefitSection({ benefit, reverse = false, videoSrc }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ligne rouge qui s'étend
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      )

      // Numéro qui apparaît
      gsap.fromTo(numberRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      )

      // Texte qui monte
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      )

      // Vidéo qui apparaît avec scale
      gsap.fromTo(videoRef.current,
        { opacity: 0, scale: 1.05 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          delay: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const textContent = (
    <div ref={textRef} className="flex flex-col justify-center h-full py-16 md:py-0">
      {/* Numéro + ligne */}
      <div className="flex items-center gap-4 mb-8">
        <span ref={numberRef} className="section-number text-[#dd3d53]">
          Bénéfice {benefit.number}
        </span>
        <div
          ref={lineRef}
          className="h-[1px] w-12 bg-[#dd3d53] origin-left"
          style={{ transformOrigin: 'left' }}
        />
      </div>

      {/* Titre — le mot bold est en italic rouge */}
      <h2 className="text-display-sm text-white mb-6 max-w-md">
        {benefit.title.split(benefit.titleBold).map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 && (
              <em className="not-italic font-black text-[#dd3d53]">
                {benefit.titleBold}
              </em>
            )}
          </span>
        ))}
      </h2>

      {/* Description */}
      <p className="text-[#707070] text-base leading-relaxed max-w-sm mb-8">
        {benefit.description}
      </p>

      {/* CTA */}
      <a href="#contact" className="btn-outline self-start flex items-center gap-2">
        {benefit.cta}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  )

  const videoContent = (
    <div className="relative w-full h-[56vw] sm:h-[50vh] md:h-full overflow-hidden">
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-contain sm:object-cover"
      />
      {/* Overlay subtil */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.05) 100%)' }}
      />
      {/* Numéro décoratif en filigrane */}
      <div
        className="absolute bottom-6 right-6 font-black text-white opacity-10 select-none pointer-events-none"
        style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 1, letterSpacing: '-0.05em' }}
      >
        {benefit.number}
      </div>
    </div>
  )

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden"
      style={{
        background: '#0a0a0a',
        borderBottom: '1px solid #141414',
        minHeight: '70vh',
      }}
    >
      <div
        className={`max-w-[1400px] mx-auto grid md:grid-cols-2 min-h-[70vh] ${reverse ? 'md:grid-flow-dense' : ''}`}
      >
        {/* Sur mobile : vidéo toujours en haut, texte en bas */}
        <div className={`${reverse ? 'md:col-start-2' : ''}`}>
          {videoContent}
        </div>
        <div className={`px-8 md:px-16 ${reverse ? 'md:col-start-1' : ''}`}>
          {textContent}
        </div>
      </div>
    </section>
  )
}

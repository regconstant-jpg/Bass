'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }
    })
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px]"
      style={{ background: 'rgba(221,61,83,0.15)' }}
    >
      <div
        ref={barRef}
        className="h-full bg-[#dd3d53] origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}

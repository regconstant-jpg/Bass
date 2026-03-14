'use client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Observer } from 'gsap/dist/Observer'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, Observer)
  gsap.config({ autoSleep: 60, nullTargetWarn: false })
  gsap.defaults({ duration: 0.8, ease: 'power2.out' })
}

export { gsap, ScrollTrigger, SplitText, Observer }

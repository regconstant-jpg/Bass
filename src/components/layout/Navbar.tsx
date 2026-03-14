'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

const NAV_LINKS = [
  { label: 'Nos marques', href: '#marques' },
  { label: 'Véhicules', href: '#vehicules' },
  { label: 'Services', href: '#services' },
  { label: 'Concessions', href: '#concessions' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: 'power2.out' }
    )

    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
        padding: scrolled ? '0.875rem 0' : '1.5rem 0',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src="https://www.cap-milanesio.fr/wp-content/uploads/2025/03/cropped-Logo-groupe-milanesio.webp"
            alt="Groupe Milanesio"
            className="h-7 sm:h-9 w-auto object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </a>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs text-[#888] hover:text-white transition-colors duration-200 tracking-widest uppercase font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Burger */}
        <div className="flex items-center gap-4">
          <a
            href="tel:0490036515"
            className="hidden md:flex items-center gap-2 btn-primary py-2.5 px-5 text-xs"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2h3l1.5 3.5-1.5 1a7 7 0 003.5 3.5l1-1.5L13 10v3a1 1 0 01-1 1A11 11 0 011 3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Nous appeler
          </a>

          {/* Burger mobile */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div className={`md:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-[#0d0d0d] border-t border-[#1a1a1a] px-5 sm:px-8 py-5 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white text-lg font-medium tracking-wide"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="tel:0490036515" className="btn-primary mt-2 justify-center text-center">
            Nous appeler
          </a>
        </div>
      </div>
    </nav>
  )
}

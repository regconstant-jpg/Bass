'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full relative overflow-hidden"
      style={{ background: '#0a0a0a', borderTop: '1px solid #1a1a1a' }}
    >
      {/* Fond avec gradient rouge subtil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(221,61,83,0.08) 0%, transparent 70%)'
        }}
      />

      <div className="cta-content relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 py-32 md:py-40">
        <div className="max-w-3xl">

          {/* Label */}
          <div className="flex items-center gap-4 mb-8">
            <span className="section-number">Commencer</span>
            <div className="divider-line" />
          </div>

          {/* Titre principal */}
          <h2 className="text-display text-white mb-6">
            Votre prochaine<br />
            voiture commence<br />
            <em className="not-italic text-[#dd3d53]">ici.</em>
          </h2>

          {/* Sous-titre */}
          <p className="text-[#555] text-lg max-w-lg mb-12 leading-relaxed">
            Prenez rendez-vous dans l&apos;une de nos 6 concessions, essayez nos véhicules et laissez-vous conseiller par nos experts.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <a href="tel:0490036515" className="btn-primary text-sm py-4 px-8">
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M2 2h3l1.5 3.5-1.5 1a7 7 0 003.5 3.5l1-1.5L13 10v3a1 1 0 01-1 1A11 11 0 011 3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Appeler maintenant
            </a>
            <a href="mailto:contact@cap-milanesio.fr" className="btn-outline text-sm py-4 px-8">
              Envoyer un message
            </a>
          </div>

          {/* Infos pratiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#1a1a1a]">
            <div>
              <p className="text-[#dd3d53] text-xs tracking-widest uppercase font-bold mb-2">
                Horaires
              </p>
              <p className="text-[#555] text-sm leading-relaxed">
                Lun–Ven : 8h–19h<br />
                Samedi : 9h–19h<br />
                Dimanche : Fermé
              </p>
            </div>
            <div>
              <p className="text-[#dd3d53] text-xs tracking-widest uppercase font-bold mb-2">
                Email
              </p>
              <a
                href="mailto:contact@cap-milanesio.fr"
                className="text-[#555] text-sm hover:text-white transition-colors duration-200"
              >
                contact@cap-milanesio.fr
              </a>
            </div>
            <div>
              <p className="text-[#dd3d53] text-xs tracking-widest uppercase font-bold mb-2">
                Nos sites
              </p>
              <p className="text-[#555] text-sm leading-relaxed">
                Avignon · Aix-en-Provence<br />
                Marignane · Marseille<br />
                Saint-Victoret · Salon
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer minimal */}
      <div
        className="border-t border-[#111] py-6"
        style={{ background: '#050505' }}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src="https://www.cap-milanesio.fr/wp-content/uploads/2025/03/cropped-Logo-groupe-milanesio.webp"
            alt="Groupe Milanesio"
            className="h-7 w-auto object-contain opacity-40"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <p className="text-[#333] text-xs">
            © 2026 Groupe Milanesio · Tous droits réservés
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[#333] hover:text-white text-xs transition-colors duration-200">
              Mentions légales
            </a>
            <a href="#" className="text-[#333] hover:text-white text-xs transition-colors duration-200">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

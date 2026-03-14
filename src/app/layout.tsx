import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Groupe Milanesio — L\'automobile autrement',
  description: 'Le Groupe Milanesio, 6 concessions automobiles CUPRA, SEAT, ŠKODA, MAZDA et HYUNDAI à Avignon, Aix-en-Provence, Marignane, Marseille, Saint-Victoret et Salon-de-Provence.',
  keywords: ['concession automobile', 'CUPRA', 'SEAT', 'SKODA', 'MAZDA', 'HYUNDAI', 'Avignon', 'Aix-en-Provence', 'Marseille'],
  openGraph: {
    title: 'Groupe Milanesio — L\'automobile autrement',
    description: '6 concessions, 5 marques, une seule passion.',
    url: 'https://groupe-milanesio.fr',
    siteName: 'Groupe Milanesio',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.variable}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}

import ScrollProgress from '@/components/ui/ScrollProgress'
import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import CounterSection from '@/components/sections/CounterSection'
import BrandsStrip from '@/components/sections/BrandsStrip'
import BenefitSection from '@/components/sections/BenefitSection'
import ConcessionSection from '@/components/sections/ConcessionSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'
import { BENEFITS } from '@/lib/data'

const VIDEO_SOURCES = [
  'https://gowhvltdclhlkdjjiwnb.supabase.co/storage/v1/object/public/Video/benefit-01.mp4',
  'https://gowhvltdclhlkdjjiwnb.supabase.co/storage/v1/object/public/Video/benefit-02.mp4',
  'https://gowhvltdclhlkdjjiwnb.supabase.co/storage/v1/object/public/Video/benefit-03-clean.mp4',
]

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <CounterSection />
      <BrandsStrip />
      {BENEFITS.map((benefit, i) => (
        <BenefitSection
          key={i}
          benefit={benefit}
          videoSrc={VIDEO_SOURCES[i]}
          reverse={i % 2 !== 0}
        />
      ))}
      <ConcessionSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}

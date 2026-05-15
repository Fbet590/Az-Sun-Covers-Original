"use client"

import { useRef, useCallback } from "react"
import { HeroSection } from "@/components/hero-section"
import { QuoteForm } from "@/components/quote-form"

import { TestimonialsSection } from "@/components/testimonials-section"
import { ServicesSection } from "@/components/services-section"
import { GallerySection } from "@/components/gallery-section"
import { FaqSection } from "@/components/faq-section"

import { Footer } from "@/components/footer"

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null)

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <main className="min-h-screen">
      <HeroSection onGetQuote={scrollToForm} />
      <div ref={formRef} className="-mt-20 relative z-10 md:mt-0">
        <QuoteForm />
      </div>
      <TestimonialsSection />
      <ServicesSection />
      <GallerySection />
      <FaqSection />
      <Footer />
    </main>
  )
}

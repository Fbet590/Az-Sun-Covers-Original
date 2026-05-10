"use client"

import { useState, useEffect, useCallback } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

const TESTIMONIALS = [
  {
    name: "Pat Tudisco",
    text: "AZ Sun Covers built a pergola in my back yard today. I cannot begin to say how very pleased we are with Manny, his crew and the company itself. PROFESSIONAL in what they do and are men of their word. Our Pergola looks fantastic.",
  },
  {
    name: "David Buettner",
    text: "Manny and team did a great job repairing my complicated roof cover after a major wind storm. They were able to duplicate the curved design and worked with me to make sure that I was happy.",
  },
  {
    name: "Ruben Pulido",
    text: "AZ Sun Covers built us a beautiful pergola with excellent craftsmanship and great service. Professional, on time, and easy to work with\u2014highly recommend!",
  },
  {
    name: "Connor",
    text: "I couldn't be happier with the pergola installation! From start to finish, the entire process was smooth, professional, and stress-free. The craftsmanship is solid and the pergola looks incredible.",
  },
  {
    name: "Nick Ortega",
    text: "I own Heat Wave Outdoor Scapes and Manny and his boys have been doing pergolas and patio extensions for the last couple years. Great customer service, great communication and great work!",
  },
  {
    name: "Riley Jade",
    text: "Manny is great! I'm a landscaping contractor and he does my pergolas for me! His quality is incredible! He is fast responsive and does great work for a very reasonable price!",
  },
]

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const total = TESTIMONIALS.length

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total)
  }, [total])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const testimonial = TESTIMONIALS[current]

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-600">
            {"Don't Just Take Our Word For It..."}
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
            See What Our Past Clients Had To Say
          </h2>
        </div>

        <div className="relative">
          {/* Review card */}
          <div className="flex flex-col items-center rounded-xl border border-border bg-card px-8 py-10 shadow-sm text-center">
            <GoogleIcon className="mb-4 size-8" />
            <div className="mb-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-5 fill-amber-500 text-amber-500"
                />
              ))}
            </div>
            <p className="mb-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              {`"${testimonial.text}"`}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">
                {testimonial.name.charAt(0)}
              </div>
              <span className="font-semibold text-foreground">
                {testimonial.name}
              </span>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            aria-label="Previous review"
            className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground sm:-translate-x-6"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next review"
            className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground sm:translate-x-6"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`size-2.5 rounded-full transition-colors ${
                i === current ? "bg-amber-600" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

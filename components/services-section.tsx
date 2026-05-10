"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const SERVICES = [
  {
    title: "Solid Top",
    description:
      "Provides full shade and complete rain protection for ultimate comfort.",
    image: "/images/solid-top.jpg",
  },
  {
    title: "Lattice",
    description:
      "Offers partial shade, perfect for adding style while still enjoying some sunlight.",
    image: "/images/lattice.jpg",
  },
  {
    title: "Louvered",
    description:
      "Adjustable panels allow you to control sunlight, shade, and ventilation with ease.",
    image: "/images/louvered.jpg",
  },
]

export function ServicesSection() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SERVICES.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SERVICES.length) % SERVICES.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="bg-card py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-600">
            Our Expert Contractor Services
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
            Custom Patio Cover Solutions
          </h2>
        </div>

        {/* Slideshow */}
        <div className="relative">
          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-3 rounded-full bg-card p-2 shadow-lg border border-border transition-colors hover:bg-muted sm:-translate-x-5"
            aria-label="Previous service"
          >
            <ChevronLeft className="size-5 text-foreground" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-3 rounded-full bg-card p-2 shadow-lg border border-border transition-colors hover:bg-muted sm:translate-x-5"
            aria-label="Next service"
          >
            <ChevronRight className="size-5 text-foreground" />
          </button>

          {/* Slide */}
          <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {SERVICES.map((service) => (
                <div
                  key={service.title}
                  className="w-full flex-shrink-0"
                >
                  <div className="relative h-72 sm:h-96 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 sm:p-8 text-center">
                    <h3 className="mb-2 text-2xl font-bold text-foreground">
                      {service.title}
                    </h3>
                    <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {SERVICES.map((service, i) => (
              <button
                key={service.title}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === current ? "w-8 bg-amber-600" : "w-2.5 bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Go to ${service.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

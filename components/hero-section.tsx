"use client"

import Image from "next/image"
import { ShieldCheck, Handshake, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection({ onGetQuote }: { onGetQuote: () => void }) {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col overflow-hidden pb-24 sm:pb-8">
      <Image
        src="/images/hero-patio.jpg"
        alt="Custom patio cover in Arizona backyard"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1207]/85 via-[#1a1207]/60 to-transparent" />

      {/* Top-left logo text */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <p className="text-base font-bold uppercase tracking-widest text-white sm:text-lg">
          AZ Sun Covers LLC
        </p>
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-6 sm:px-6 sm:py-0 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="mb-3 sm:mb-5 text-[2.55rem] font-bold leading-tight text-white sm:text-[3.2rem] lg:text-[3.825rem] text-balance" style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
            Transform Your Outdoor Space.{"\n\n"}Get our 7K Flat Offer.{"\n\n"}Custom Patio Covers Designed to Impress.
          </h1>
          <p className="mb-5 sm:mb-8 text-lg leading-relaxed text-white/80 sm:text-xl lg:text-2xl">
            Handcrafted Patio Covers That Turn Ordinary Backyards Into Luxury Retreats
          </p>
          <Button
            onClick={onGetQuote}
            size="lg"
            className="h-12 rounded-lg bg-amber-600 px-8 text-base font-semibold text-white hover:bg-amber-700 sm:h-14 sm:px-10 sm:text-lg"
          >
            GET 7K OFFER
          </Button>

        </div>
      </div>

      {/* Licensed | Bonded | Insured badges - bottom of hero, full width */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-4 sm:pb-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-evenly">
          <div className="flex items-center gap-2 rounded bg-white/10 px-4 py-2.5 backdrop-blur-sm">
            <ShieldCheck className="size-5 shrink-0 text-amber-400" />
            <span className="text-sm font-semibold uppercase tracking-wide text-white">Licensed</span>
          </div>
          <div className="flex items-center gap-2 rounded bg-white/10 px-4 py-2.5 backdrop-blur-sm">
            <Handshake className="size-5 shrink-0 text-amber-400" />
            <span className="text-sm font-semibold uppercase tracking-wide text-white">Bonded</span>
          </div>
          <div className="flex items-center gap-2 rounded bg-white/10 px-4 py-2.5 backdrop-blur-sm">
            <FileCheck className="size-5 shrink-0 text-amber-400" />
            <span className="text-sm font-semibold uppercase tracking-wide text-white">Insured</span>
          </div>
        </div>
        <p className="mt-2 text-center text-[13px] uppercase tracking-wider text-white/50">R.O.C. 345996</p>
      </div>
    </section>
  )
}

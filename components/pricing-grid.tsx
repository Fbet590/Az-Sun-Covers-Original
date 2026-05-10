"use client"

import { ArrowRight } from "lucide-react"

export function PricingGrid({ onGetQuote }: { onGetQuote: () => void }) {
  return (
    <section className="bg-[#1a1207] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Transparent Pricing
          </p>
          <h2
            className="text-3xl font-extrabold text-white sm:text-4xl text-balance"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            Simple, Honest Pricing for Every Project
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Lattice */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-background p-6 shadow-lg">
            <div>
              <p className="mb-4 text-[0.9375rem] font-bold uppercase tracking-[0.2em] text-amber-600">
                Lattice Pergolas & Sun Covers Starting @
              </p>
              <p className="mb-3">
                <span className="text-sm align-top text-foreground/70">$</span>
                <span
                  className="text-5xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  22
                </span>
                <span className="text-base text-foreground/70">/sq. ft.</span>
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Enjoy the blend of sunlight and shade with our Lattice Pergolas and Patio Covers, prices starting at just $22 per square foot.
              </p>
            </div>
            <div className="mt-6 border-t border-border pt-6">
              <button
                onClick={onGetQuote}
                className="inline-flex items-center gap-2 rounded-md border border-foreground px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Get a Free Quote
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Solid - featured */}
          <div className="flex flex-col justify-between rounded-xl bg-amber-700 p-6 shadow-lg">
            <div>
              <p className="mb-4 text-[0.9375rem] font-bold uppercase tracking-[0.2em] text-amber-200">
                Solid Pergolas & Patio Covers Starting @
              </p>
              <p className="mb-3">
                <span className="text-sm align-top text-white/70">$</span>
                <span
                  className="text-5xl font-bold text-white"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  23
                </span>
                <span className="text-base text-white/70">/sq. ft.</span>
              </p>
              <p className="text-sm leading-relaxed text-white/80">
                Experience full coverage from the elements with our Solid Pergolas and Patio Covers, starting at $23 per square foot.
              </p>
            </div>
            <div className="mt-6 border-t border-white/20 pt-6">
              <button
                onClick={onGetQuote}
                className="inline-flex items-center gap-2 rounded-md border border-white bg-white px-5 py-2.5 text-sm font-medium text-amber-800 transition-colors hover:bg-white/90"
              >
                Free In-Home Estimate
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Posts */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-background p-6 shadow-lg">
            <div>
              <p className="mb-4 text-[0.9375rem] font-bold uppercase tracking-[0.2em] text-amber-600">
                Pergola & Sun Cover Posts Starting @
              </p>
              <p className="mb-3">
                <span className="text-sm align-top text-foreground/70">$</span>
                <span
                  className="text-5xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  250
                </span>
                <span className="text-base text-foreground/70">/per post</span>
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Ensure stability with our Pergola & Patio Cover posts, necessary for each corner and every 24ft, priced at $250 each.
              </p>
            </div>
            <div className="mt-6 border-t border-border pt-6">
              <button
                onClick={onGetQuote}
                className="inline-flex items-center gap-2 rounded-md border border-foreground px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Get a Free Quote
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

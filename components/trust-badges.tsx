"use client"

import { Button } from "@/components/ui/button"
import {
  DollarSign,
  Award,
  MessageSquare,
  Hammer,
  FileCheck,
  ShieldCheck,
} from "lucide-react"

const trustItems = [
  { icon: DollarSign, title: "Clear, Upfront Pricing" },
  { icon: Award, title: "Proven Expertise & Stunning Results" },
  { icon: MessageSquare, title: "Communication You Can Count On" },
  { icon: Hammer, title: "Expert Material Guidance" },
  { icon: FileCheck, title: "Permits Handled For You" },
  { icon: ShieldCheck, title: "Professional, Reliable Service" },
]

export function TrustBadges({ onGetQuote }: { onGetQuote: () => void }) {
  return (
    <section className="bg-card py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-5xl font-bold text-amber-600">10</span>
            <span className="text-2xl font-bold text-amber-600">+</span>
          </div>
          <span className="text-lg font-medium text-foreground">Years Experience</span>
        </div>

        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-600">
            {"Choosing a contractor doesn't have to be stressful"}
          </p>
          <h2
            className="text-3xl font-extrabold text-foreground sm:text-4xl text-balance"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            No more endless searching, hidden costs, or surprise delays
          </h2>
          <p className="mt-3 text-muted-foreground">
            {"Here's why homeowners trust us:"}
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-xl border border-border bg-background p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-amber-600/10">
                <item.icon className="size-6 text-amber-600" />
              </div>
              <p className="font-medium text-foreground">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={onGetQuote}
            size="default"
            className="h-[50px] rounded-lg bg-amber-600 px-[30px] text-[1.1rem] font-semibold text-white hover:bg-amber-700"
          >
            Free Shade Analysis
          </Button>
        </div>
      </div>
    </section>
  )
}

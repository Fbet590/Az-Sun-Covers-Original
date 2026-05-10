import { Button } from "@/components/ui/button"

export function CtaSection({ onGetQuote }: { onGetQuote: () => void }) {
  return (
    <section className="bg-[#1a1207] py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl text-balance">
          Ready to Reimagine Your Outdoor Living Space?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
          Our skilled team specializes in patio cover projects of all sizes, delivering precise craftsmanship, clear communication, and results that go above and beyond your expectations.
        </p>
        <Button
          onClick={onGetQuote}
          size="lg"
          className="mt-8 h-14 rounded-lg bg-amber-600 px-10 text-lg font-semibold text-white hover:bg-amber-700"
        >
          Get a Quote
        </Button>
      </div>
    </section>
  )
}

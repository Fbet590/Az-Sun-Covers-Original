"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, ChevronRight, Send, User, Mail, Phone, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = [
  {
    title: "What's your name?",
    subtitle: "So we know who to ask for",
    type: "text" as const,
    placeholder: "Your full name",
    field: "name",
    icon: User,
  },
  {
    title: "What's your email?",
    subtitle: "We'll send your quote here",
    type: "text" as const,
    placeholder: "your@email.com",
    field: "email",
    icon: Mail,
  },
  {
    title: "Best number to reach you?",
    subtitle: "For a quick follow-up call",
    type: "text" as const,
    placeholder: "(555) 123-4567",
    field: "phone",
    icon: Phone,
  },
]

const playfairStyle = { fontFamily: "var(--font-playfair), Playfair Display, serif" }

export function QuoteForm() {
  const [step, setStep] = useState(0)
  const [textInputs, setTextInputs] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [animate, setAnimate] = useState(false)
  const totalSteps = STEPS.length
  const currentStep = STEPS[step]

  useEffect(() => {
    setAnimate(true)
    const timer = setTimeout(() => setAnimate(false), 300)
    return () => clearTimeout(timer)
  }, [step])

  const canGoNext = currentStep.field
    ? !!textInputs[currentStep.field]?.trim()
    : false

  const handleNext = () => {
    if (step < totalSteps - 1) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 0) setStep(step - 1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canGoNext) {
      if (step < totalSteps - 1) {
        handleNext()
      } else {
        handleSubmit()
      }
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError("")
    try {
      const payload = {
        name: textInputs.name || "",
        email: textInputs.email || "",
        phone: textInputs.phone || "",
      }
      const res = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Something went wrong")
      }
      if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Lead")
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section id="quote-form" className="bg-[#1a1207] pt-10 pb-20 md:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="rounded-2xl border border-amber-600/20 bg-[#261c0d] p-12 shadow-2xl">
            <div className="relative mx-auto mb-6 size-20">
              <div className="absolute inset-0 animate-ping rounded-full bg-amber-500/20" />
              <div className="relative flex size-20 items-center justify-center rounded-full bg-amber-500/20">
                <CheckCircle2 className="size-10 text-amber-500" />
              </div>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white" style={playfairStyle}>
              You&apos;re All Set, {textInputs.name?.split(" ")[0] || "Friend"}!
            </h2>
            <p className="text-lg leading-relaxed text-white/70">
              {"We've received your information and will be in touch shortly to discuss your project."}
            </p>
          </div>
        </div>
      </section>
    )
  }

  const Icon = currentStep.icon

  return (
    <section id="quote-form" className="bg-[#1a1207] pt-10 pb-20 md:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-400">
            <Sparkles className="size-4" />
            Takes less than 19 seconds
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl text-balance" style={{...playfairStyle, fontSize: "45px"}}>
            Get Our 7K Offer
          </h2>
          <p className="mt-3 text-white/60">No pressure. No obligation.</p>
        </div>

        <div className="rounded-2xl border border-amber-600/20 bg-[#261c0d] p-6 shadow-2xl sm:p-10">
          {/* Step indicators */}
          <div className="mb-8 flex items-center justify-center gap-3">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300",
                  i < step
                    ? "bg-amber-500 text-white cursor-pointer hover:bg-amber-600"
                    : i === step
                    ? "bg-amber-500/20 text-amber-400 ring-2 ring-amber-500 ring-offset-2 ring-offset-[#261c0d]"
                    : "bg-white/5 text-white/30 cursor-not-allowed"
                )}
              >
                {i < step ? <CheckCircle2 className="size-5" /> : i + 1}
              </button>
            ))}
          </div>

          {/* Animated content */}
          <div className={cn(
            "transition-all duration-300",
            animate ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}>
            {/* Icon */}
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-amber-500/10">
              <Icon className="size-8 text-amber-500" />
            </div>

            <h3 className="mb-2 text-center text-xl font-semibold text-white sm:text-2xl">
              {currentStep.title}
            </h3>
            <p className="mb-6 text-center text-white/50">
              {currentStep.subtitle}
            </p>

            {currentStep.field && (
              <div className="mx-auto max-w-md">
                <Input
                  type={currentStep.field === "email" ? "email" : currentStep.field === "phone" ? "tel" : "text"}
                  placeholder={currentStep.placeholder}
                  value={textInputs[currentStep.field] || ""}
                  onChange={(e) =>
                    setTextInputs((prev) => ({
                      ...prev,
                      [currentStep.field!]: e.target.value,
                    }))
                  }
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="h-16 rounded-xl border-2 border-white/10 bg-white/5 text-center text-xl text-white placeholder:text-white/30 focus-visible:border-amber-500 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200"
                />
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={step === 0}
              className={cn(
                "text-sm font-medium transition-all",
                step === 0 ? "text-white/20 cursor-not-allowed" : "text-white/50 hover:text-white"
              )}
            >
              Back
            </button>

            {step < totalSteps - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!canGoNext}
                className={cn(
                  "h-12 rounded-xl bg-amber-600 px-8 text-base font-semibold text-white transition-all duration-200",
                  canGoNext ? "hover:bg-amber-700 hover:scale-105" : "opacity-30"
                )}
              >
                Continue
                <ChevronRight className="ml-1 size-5" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canGoNext || submitting}
                className={cn(
                  "h-12 rounded-xl bg-amber-600 px-8 text-base font-semibold text-white transition-all duration-200",
                  canGoNext && !submitting ? "hover:bg-amber-700 hover:scale-105" : "opacity-30"
                )}
              >
                {submitting ? (
                  <>
                    <div className="mr-2 size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    Get My Quote
                    <Send className="ml-2 size-4" />
                  </>
                )}
              </Button>
            )}
          </div>

          {error && (
            <p className="mt-4 text-center text-sm text-red-400">{error}</p>
          )}
        </div>
      </div>
    </section>
  )
}

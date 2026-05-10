"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, ChevronLeft, ChevronRight, Send } from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = [
  {
    title: "What kind of structure are you looking for?",
    type: "select" as const,
    options: [
      { label: "Solid Top", icon: "solid" },
      { label: "Lattice (Let some light in)", icon: "lattice" },
      { label: "Louvered (Opens and closes)", icon: "louvered" },
    ],
  },
  {
    title: "What's your approximate budget for this project?",
    type: "select" as const,
    options: [
      { label: "Under $9,000", icon: "budget" },
      { label: "$10,000 – $15,000", icon: "budget" },
      { label: "$15,000 – $25,000", icon: "budget" },
      { label: "$25,000 + (Custom)", icon: "budget" },
    ],
  },
  {
    title: "Where will the structure go?",
    type: "select" as const,
    options: [
      { label: "Attached to house", icon: "attached" },
      { label: "Free Standing", icon: "free" },
    ],
  },
  {
    title: "Are you flexible with your budget to guarantee premium-quality materials and workmanship?",
    type: "select" as const,
    options: [
      { label: "Yes, I prefer premium quality even if the cost increases slightly", icon: "yes" },
      { label: "Maybe, depends on the options presented", icon: "maybe" },
      { label: "No, I have a fixed budget", icon: "no" },
    ],
  },
  {
    title: "Enter your name:",
    type: "text" as const,
    placeholder: "Your full name",
    field: "name",
  },
  {
    title: "What's your email address?",
    type: "text" as const,
    placeholder: "your@email.com",
    field: "email",
  },
  {
    title: "What's the best mobile number to reach you on?",
    type: "text" as const,
    placeholder: "(555) 123-4567",
    field: "phone",
  },
]

const playfairStyle = { fontFamily: "var(--font-playfair), Playfair Display, serif" }

export function QuoteForm() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [textInputs, setTextInputs] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const totalSteps = STEPS.length
  const progress = ((step + 1) / totalSteps) * 100
  const currentStep = STEPS[step]

  const canGoNext = currentStep.type === "select"
    ? !!answers[step]
    : currentStep.field
      ? !!textInputs[currentStep.field]?.trim()
      : false

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step]: value }))
  }

  const handleNext = () => {
    if (step < totalSteps - 1) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 0) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError("")
    try {
      const payload = {
        structure: answers[0] || "",
        budget: answers[1] || "",
        placement: answers[2] || "",
        budgetFlexibility: answers[3] || "",
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
        (window as any).fbq("track", "Lead", {
          content_name: payload.structure,
          value: payload.budget,
        })
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
      <section id="quote-form" className="bg-[#1a1207] py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="rounded-2xl border border-amber-600/20 bg-[#261c0d] p-12 shadow-2xl">
            <CheckCircle2 className="mx-auto mb-6 size-16 text-amber-500" />
            <h2 className="mb-4 text-3xl font-bold text-white" style={playfairStyle}>
              Thank You!
            </h2>
            <p className="text-lg leading-relaxed text-white/70">
              {"We've received your information and will be in touch shortly to discuss your project."}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="quote-form" className="bg-[#1a1207] py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-400">
            AZ Sun Covers LLC
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl text-balance" style={playfairStyle}>
            {"CHECK OFF THE OPTION YOU'RE LOOKING FOR BELOW"}
          </h2>
          <p className="mt-2 text-amber-400/80">{"And We'll Do The Rest!"}</p>
        </div>

        <div className="rounded-2xl border border-amber-600/20 bg-[#261c0d] p-6 shadow-2xl sm:p-10">
          <div className="mb-8">
            <div className="mb-2 flex justify-between text-sm text-white/50">
              <span>Step {step + 1} of {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/10 [&>[data-slot=progress-indicator]]:bg-amber-500" />
          </div>

          <h3 className="mb-6 text-center text-lg font-semibold text-white sm:text-xl">
            {currentStep.title}
          </h3>

          {currentStep.type === "select" && currentStep.options && (
            <div className="flex flex-col gap-3">
              {currentStep.options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleSelect(option.label)}
                  className={cn(
                    "w-full rounded-xl border-2 px-5 py-4 text-left text-sm font-medium transition-all sm:text-base",
                    answers[step] === option.label
                      ? "border-amber-500 bg-amber-500/15 text-amber-300"
                      : "border-white/10 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {currentStep.type === "text" && currentStep.field && (
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
                className="h-14 rounded-xl border-white/10 bg-white/5 text-center text-lg text-white placeholder:text-white/40 focus-visible:border-amber-500 focus-visible:ring-amber-500/30"
              />
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={step === 0}
              className="text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronLeft className="mr-1 size-4" />
              Previous
            </Button>

            {step < totalSteps - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!canGoNext}
                className="bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-30"
              >
                Next
                <ChevronRight className="ml-1 size-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canGoNext || submitting}
                className="bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-30"
              >
                {submitting ? "Sending..." : "Submit"}
                {!submitting && <Send className="ml-1 size-4" />}
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

"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQS = [
  {
    question: "How long does it take to build a patio cover?",
    answer:
      "On average, our patio cover installations are completed within one to two weeks, ensuring minimal disruption to your schedule.",
  },
  {
    question: "Do you offer a payment plan?",
    answer:
      "Yes, we offer flexible financing options to accommodate your budget and make your patio cover project more accessible.",
  },
  {
    question: "Do I need a permit to install a patio cover?",
    answer:
      "Permits aren't always required. Some projects, like those involving HOAs or commercial projects, may need one. If that's the case, we will handle it for you!",
  },
]

const poppinsStyle = { fontFamily: "var(--font-poppins), Poppins, sans-serif" }

export function FaqSection() {
  return (
    <section className="bg-card py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2
            className="text-3xl font-bold text-foreground sm:text-4xl"
            style={poppinsStyle}
          >
            FAQs
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

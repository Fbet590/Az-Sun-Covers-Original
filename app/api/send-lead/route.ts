import { NextResponse } from "next/server"

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/rDrIW6TO5WawA7pvJ58H/webhook-trigger/e17e4a97-66d6-48cb-ae0c-115b84291046"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { name, email, phone } = body

    const payload = {
      contact: {
        name,
        email,
        phone,
      },
      source: "AZ Sun Covers Landing Page - Essential Package",
      submitted_at: new Date().toISOString(),
    }

    const webhookResponse = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!webhookResponse.ok) {
      throw new Error("Webhook delivery failed")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Lead submission error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}

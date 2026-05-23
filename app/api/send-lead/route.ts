import { NextResponse } from "next/server"

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/0VbUGbZaW3xKX3mcDC4p/webhook-trigger/65853a6e-d44a-4824-bb97-990e14ee15cb"

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

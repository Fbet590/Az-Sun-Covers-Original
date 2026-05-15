import { NextResponse } from "next/server"

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/0VbUGbZaW3xKX3mcDC4p/webhook-trigger/zgKJ6QzxfT7hM4zqnr7Z"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      structure,
      budget,
      placement,
      budgetFlexibility,
      name,
      email,
      phone,
    } = body

    const webhookPayload = {
      contact: {
        name,
        email,
        phone,
      },
      structure,
      budget,
      placement,
      budget_flexibility: budgetFlexibility,
      source: "AZ Sun Covers Landing Page",
      submitted_at: new Date().toISOString(),
    }

    const webhookRes = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookPayload),
    })

    if (!webhookRes.ok) {
      return NextResponse.json(
        { error: "Failed to submit your request. Please try again." },
        { status: 502 }
      )
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

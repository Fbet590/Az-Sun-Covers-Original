import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { name, email, phone } = body

    // Log the submission for now (webhook removed)
    console.log("Lead submission received:", { name, email, phone, submitted_at: new Date().toISOString() })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Lead submission error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}

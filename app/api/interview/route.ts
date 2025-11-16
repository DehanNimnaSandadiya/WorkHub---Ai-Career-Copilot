import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { generateText, extractJSON } from "@/lib/gemini"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { role } = await req.json()

    if (!role) {
      return NextResponse.json({ error: "Role is required" }, { status: 400 })
    }

    const prompt = `Generate interview preparation questions for the role: ${role}

Provide:
1. 10 technical questions (as JSON array of objects with "question" and optional "answer")
2. 10 behavioral questions (as JSON array of objects with "question" and optional "answer")
3. 5 company-specific questions (as JSON array of objects with "question" and optional "answer")

Return ONLY valid JSON in this format:
{
  "technical": [{"question": "question text", "answer": "sample answer"}],
  "behavioral": [{"question": "question text", "answer": "sample answer"}],
  "companySpecific": [{"question": "question text", "answer": "sample answer"}]
}`

    const responseText = await generateText(prompt)
    const prep = extractJSON(responseText)

    return NextResponse.json(prep)
  } catch (error: any) {
    console.error("Error generating interview prep:", error)
    const errorMessage = error?.message || "Failed to generate interview prep"
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}


import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { generateText, extractJSON } from "@/lib/gemini"
const pdf = require("pdf-parse")

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Extract text from PDF
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const pdfData = await pdf(buffer)
    const resumeText = pdfData.text

    // Use AI to tailor resume
    const prompt = `Analyze this resume and provide:
1. An optimized professional summary (2-3 sentences)
2. Rewritten key experiences with better impact (as JSON array of objects with title, company, description)
3. Extracted and optimized skills list (as JSON array)

Resume Text:
${resumeText}

Return ONLY valid JSON in this format:
{
  "summary": "optimized summary text",
  "experiences": [{"title": "Job Title", "company": "Company", "description": "description"}],
  "skills": ["skill1", "skill2"]
}`

    const responseText = await generateText(prompt)
    const tailoredResume = extractJSON(responseText)

    // Save resume to database
    await prisma.resume.create({
      data: {
        userId: session.user.id,
        text: resumeText,
      },
    })

    return NextResponse.json(tailoredResume)
  } catch (error: any) {
    console.error("Error processing resume:", error)
    const errorMessage = error?.message || "Failed to process resume"
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}


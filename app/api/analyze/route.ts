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

    const { jobDescription } = await req.json()

    if (!jobDescription) {
      return NextResponse.json({ error: "Job description is required" }, { status: 400 })
    }

    // TODO: Get user's resume from database for comparison
    const prompt = `Analyze this job description and provide:
1. Required skills (as a JSON array)
2. Missing skills compared to a typical candidate (as a JSON array)
3. Match score (0-100 as a number)
4. Suggestions for improvement (as a JSON array)
5. Key responsibilities (as a JSON array)

Job Description:
${jobDescription}

Return ONLY valid JSON in this format:
{
  "skills": ["skill1", "skill2"],
  "missingSkills": ["skill3", "skill4"],
  "matchScore": 75,
  "suggestions": ["suggestion1", "suggestion2"],
  "responsibilities": ["responsibility1", "responsibility2"]
}`

    const responseText = await generateText(prompt)
    const analysis = extractJSON(responseText)

    return NextResponse.json(analysis)
  } catch (error: any) {
    console.error("Error analyzing job:", error)
    const errorMessage = error?.message || "Failed to analyze job description"
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}


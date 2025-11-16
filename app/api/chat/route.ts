import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { generateText } from "@/lib/gemini"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { message } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // TODO: Get user's resume and job history from database
    // TODO: Use vector DB for RAG (Retrieval Augmented Generation)

    const prompt = `You are a career AI assistant helping with job search and career development.
Provide helpful, personalized advice based on the user's context.

User message: ${message}

Provide a helpful response.`

    const response = await generateText(prompt) || "I'm here to help with your career questions!"

    return NextResponse.json({ response })
  } catch (error: any) {
    console.error("Error in chat:", error)
    const errorMessage = error?.message || "Failed to process chat message"
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}


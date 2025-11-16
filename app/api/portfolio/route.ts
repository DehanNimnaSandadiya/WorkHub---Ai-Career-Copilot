import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { username, bio, skills, projects } = await req.json()

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    // Save portfolio to database
    const portfolio = await prisma.portfolio.create({
      data: {
        userId: session.user.id,
        username,
        bio: bio || "",
        skills: skills || [],
        projects: projects || [],
      },
    })

    // TODO: Generate portfolio HTML/React components
    // TODO: Deploy to Vercel

    return NextResponse.json({
      ...portfolio,
      url: `https://${username}.workhub.vercel.app`, // Placeholder
    })
  } catch (error: any) {
    console.error("Error creating portfolio:", error)
    const errorMessage = error?.message || "Failed to create portfolio"
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}


"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  FileText, 
  Briefcase, 
  Target, 
  Users, 
  Sparkles, 
  MessageSquare,
  Settings,
  LogOut,
  Menu
} from "lucide-react"
import { signOut } from "next-auth/react"
import { useState } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin")
    return null
  }

  const navItems = [
    { href: "/dashboard", label: "Overview", icon: Target },
    { href: "/dashboard/analyzer", label: "Job Analyzer", icon: Briefcase },
    { href: "/dashboard/resume", label: "Resume Tailor", icon: FileText },
    { href: "/dashboard/tracker", label: "Application Tracker", icon: Target },
    { href: "/dashboard/interview", label: "Interview Prep", icon: Users },
    { href: "/dashboard/portfolio", label: "Portfolio Builder", icon: Sparkles },
    { href: "/dashboard/chat", label: "Career Chatbot", icon: MessageSquare },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <Link href="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            WorkHub
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            {session?.user?.name || session?.user?.email}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed lg:sticky lg:translate-x-0 top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 transition-transform duration-300 z-40 overflow-y-auto`}
        >
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-0">
          {children}
        </main>
      </div>
    </div>
  )
}


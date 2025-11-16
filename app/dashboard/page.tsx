import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, FileText, Target, TrendingUp, Sparkles, MessageSquare } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const stats = [
    { label: "Applications", value: "0", icon: Briefcase, color: "text-blue-600" },
    { label: "Resumes", value: "0", icon: FileText, color: "text-green-600" },
    { label: "Avg Match Score", value: "0%", icon: Target, color: "text-purple-600" },
    { label: "Portfolios", value: "0", icon: Sparkles, color: "text-pink-600" },
  ]

  const quickActions = [
    {
      title: "Analyze Job Post",
      description: "Get instant match score and skill gap analysis",
      href: "/dashboard/analyzer",
      icon: Briefcase,
      color: "bg-blue-500",
    },
    {
      title: "Tailor Resume",
      description: "Optimize your resume for a specific job",
      href: "/dashboard/resume",
      icon: FileText,
      color: "bg-green-500",
    },
    {
      title: "Interview Prep",
      description: "Generate questions and practice answers",
      href: "/dashboard/interview",
      icon: Target,
      color: "bg-purple-500",
    },
    {
      title: "Build Portfolio",
      description: "Create and deploy your portfolio",
      href: "/dashboard/portfolio",
      icon: Sparkles,
      color: "bg-pink-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your career overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.label}
                </CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.href} href={action.href}>
                <Card className="hover:shadow-lg transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`${action.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle>{action.title}</CardTitle>
                        <CardDescription>{action.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest job applications and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No recent activity yet</p>
            <p className="text-sm mt-2">Start by analyzing a job post or uploading your resume</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


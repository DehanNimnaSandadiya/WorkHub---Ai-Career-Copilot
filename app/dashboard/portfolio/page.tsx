"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Loader2, ExternalLink } from "lucide-react"

export default function PortfolioPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    skills: "",
    projects: "",
  })
  const [portfolio, setPortfolio] = useState<any>(null)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      let projects = []
      try {
        projects = formData.projects ? JSON.parse(formData.projects) : []
      } catch (e) {
        alert("Invalid JSON format for projects. Please use valid JSON array format.")
        setLoading(false)
        return
      }

      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          bio: formData.bio,
          skills: formData.skills.split(",").map(s => s.trim()).filter(s => s),
          projects: projects,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create portfolio")
      }

      const data = await response.json()
      setPortfolio(data)
    } catch (error: any) {
      console.error("Error generating portfolio:", error)
      alert(error?.message || "Failed to generate portfolio")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Portfolio Builder</h1>
        <p className="text-gray-600 mt-2">Create and deploy your portfolio in minutes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Details</CardTitle>
            <CardDescription>Enter your information to generate your portfolio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Username (for URL)"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <Textarea
              placeholder="Bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
            <Input
              placeholder="Skills (comma-separated)"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            />
            <Textarea
              placeholder="Projects (JSON format)"
              value={formData.projects}
              onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
            />
            <Button onClick={handleGenerate} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 w-4 h-4" />
                  Generate Portfolio
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Your portfolio preview</CardDescription>
          </CardHeader>
          <CardContent>
            {portfolio ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{portfolio.username}</h3>
                  <p className="text-sm text-gray-600">{portfolio.bio}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {portfolio.skills?.map((skill: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                {portfolio.url && (
                  <Button className="w-full">
                    <ExternalLink className="mr-2 w-4 h-4" />
                    View Portfolio
                  </Button>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Fill in the form to generate your portfolio</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


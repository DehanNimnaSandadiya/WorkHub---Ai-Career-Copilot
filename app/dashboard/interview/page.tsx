"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, MessageSquare } from "lucide-react"

export default function InterviewPage() {
  const [role, setRole] = useState("")
  const [loading, setLoading] = useState(false)
  const [prep, setPrep] = useState<any>(null)

  const handleGenerate = async () => {
    if (!role.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate interview prep")
      }

      const data = await response.json()
      setPrep(data)
    } catch (error: any) {
      console.error("Error generating interview prep:", error)
      alert(error?.message || "Failed to generate interview prep")
      setPrep(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Interview Prep</h1>
        <p className="text-gray-600 mt-2">Generate practice questions and sample answers</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Interview Questions</CardTitle>
          <CardDescription>Enter the role you're interviewing for</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="e.g., Senior Software Engineer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <Button onClick={handleGenerate} disabled={loading || !role.trim()}>
            {loading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <MessageSquare className="mr-2 w-4 h-4" />
                Generate Questions
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {prep && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Technical Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prep.technical?.map((q: any, i: number) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium mb-2">{q.question}</p>
                    {q.answer && <p className="text-sm text-gray-600">{q.answer}</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Behavioral Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prep.behavioral?.map((q: any, i: number) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium mb-2">{q.question}</p>
                    {q.answer && <p className="text-sm text-gray-600">{q.answer}</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Company-Specific</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prep.companySpecific?.map((q: any, i: number) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium mb-2">{q.question}</p>
                    {q.answer && <p className="text-sm text-gray-600">{q.answer}</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}


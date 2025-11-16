"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, CheckCircle2, XCircle } from "lucide-react"

export default function AnalyzerPage() {
  const [jobDescription, setJobDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze job description")
      }

      const data = await response.json()
      setAnalysis(data)
    } catch (error: any) {
      console.error("Error analyzing job:", error)
      alert(error?.message || "Failed to analyze job description")
      setAnalysis(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Job Description Analyzer</h1>
        <p className="text-gray-600 mt-2">Paste a job post to get instant match score and insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
            <CardDescription>Paste the full job posting here</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[400px]"
            />
            <Button onClick={handleAnalyze} disabled={loading || !jobDescription.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 w-4 h-4" />
                  Analyze Job
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>Match score and skill insights</CardDescription>
          </CardHeader>
          <CardContent>
            {analysis ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Match Score</span>
                    <span className="text-2xl font-bold text-blue-600">{analysis.matchScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${analysis.matchScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.skills?.map((skill: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {analysis.missingSkills && analysis.missingSkills.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2 text-red-600">Missing Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.missingSkills.map((skill: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {analysis.suggestions && (
                  <div>
                    <h3 className="font-semibold mb-2">Suggestions</h3>
                    <ul className="space-y-2">
                      {analysis.suggestions.map((suggestion: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Analysis results will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


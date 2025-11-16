"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Upload, Loader2, Download } from "lucide-react"

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [tailoredResume, setTailoredResume] = useState<any>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to process resume")
      }

      const data = await response.json()
      setTailoredResume(data)
    } catch (error: any) {
      console.error("Error uploading resume:", error)
      alert(error?.message || "Failed to process resume")
      setTailoredResume(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Resume Tailor Engine</h1>
        <p className="text-gray-600 mt-2">Upload your resume and get AI-powered optimization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Resume</CardTitle>
            <CardDescription>Upload your PDF resume to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload">
                <Button variant="outline" asChild>
                  <span>
                    <Upload className="mr-2 w-4 h-4" />
                    Choose PDF File
                  </span>
                </Button>
              </label>
              {file && (
                <p className="mt-4 text-sm text-gray-600">{file.name}</p>
              )}
            </div>
            <Button onClick={handleUpload} disabled={loading || !file} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FileText className="mr-2 w-4 h-4" />
                  Tailor Resume
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tailored Resume</CardTitle>
            <CardDescription>AI-optimized version of your resume</CardDescription>
          </CardHeader>
          <CardContent>
            {tailoredResume ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Summary</h3>
                  <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {tailoredResume.summary}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {tailoredResume.skills?.map((skill: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <Button className="w-full">
                  <Download className="mr-2 w-4 h-4" />
                  Download Tailored Resume
                </Button>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Upload a resume to see tailored version</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Briefcase, TrendingUp } from "lucide-react"

export default function TrackerPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    jd: "",
  })

  const handleAddJob = async () => {
    // TODO: Implement API call
    const newJob = {
      id: Date.now().toString(),
      ...formData,
      status: "applied",
      match: 0,
      createdAt: new Date(),
    }
    setJobs([...jobs, newJob])
    setFormData({ title: "", company: "", jd: "" })
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Application Tracker</h1>
          <p className="text-gray-600 mt-2">Track all your job applications in one place</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 w-4 h-4" />
          Add Application
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Application</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Job Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Input
              placeholder="Company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
            <div className="flex gap-2">
              <Button onClick={handleAddJob}>Add</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="text-center py-12">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No applications yet</p>
              <p className="text-sm text-gray-400 mt-2">Add your first application to get started</p>
            </CardContent>
          </Card>
        ) : (
          jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <CardDescription>{job.company}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Match Score</span>
                  <span className="text-lg font-bold text-blue-600">{job.match}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {job.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}


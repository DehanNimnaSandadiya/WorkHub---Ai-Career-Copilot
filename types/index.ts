export interface JobAnalysis {
  skills: string[]
  missingSkills: string[]
  matchScore: number
  suggestions: string[]
  responsibilities: string[]
}

export interface ResumeTailor {
  summary: string
  experiences: Experience[]
  skills: string[]
}

export interface Experience {
  title: string
  company: string
  description: string
  duration: string
}

export interface InterviewPrep {
  technical: Question[]
  behavioral: Question[]
  companySpecific: Question[]
}

export interface Question {
  question: string
  answer?: string
  category: string
}

export interface PortfolioData {
  username: string
  bio: string
  skills: string[]
  projects: Project[]
}

export interface Project {
  name: string
  description: string
  tech: string[]
  url?: string
  github?: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}


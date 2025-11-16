import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, FileText, Briefcase, Users, MessageSquare, Target } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          WorkHub
        </div>
        <div className="flex gap-4">
          <Link href="/auth/signin">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/auth/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Career Copilot</span>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Land Your Dream Job
            <br />
            with AI
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Optimize your resume, analyze job posts, track applications, prep for interviews, 
            and build your portfolio—all in one powerful platform.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <FeatureCard
            icon={<FileText className="w-8 h-8" />}
            title="Resume Tailor"
            description="AI-powered resume optimization tailored to each job description"
          />
          <FeatureCard
            icon={<Briefcase className="w-8 h-8" />}
            title="Job Analyzer"
            description="Get instant match scores and skill gap analysis for any job post"
          />
          <FeatureCard
            icon={<Target className="w-8 h-8" />}
            title="Application Tracker"
            description="Track all your applications with status updates and reminders"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Interview Prep"
            description="Generate technical and behavioral questions with sample answers"
          />
          <FeatureCard
            icon={<Sparkles className="w-8 h-8" />}
            title="Portfolio Builder"
            description="Create and deploy a stunning portfolio in minutes"
          />
          <FeatureCard
            icon={<MessageSquare className="w-8 h-8" />}
            title="AI Career Chatbot"
            description="Get personalized career advice powered by your resume and job history"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to accelerate your career?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals using AI to land their dream jobs
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-gray-600">
        <p>
          &copy; 2025 WorkHub. Created by{" "}
          <a 
            href="https://www.linkedin.com/in/dehannimnasandadiya/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline font-medium"
          >
            Dehan Nimna Sandadiya
          </a>
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}


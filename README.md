# WorkHub - AI Career Copilot SaaS

WorkHub is a modern, full-stack web application designed to help job seekers optimize their resumes, analyze job descriptions, track applications, and get AI-powered career guidance. This platform is built using Next.js, TailwindCSS, and PostgreSQL, with AI features powered by OpenRouter (supporting multiple AI models including Google Gemini, Claude, and GPT-4).

## Features

- 🎯 **Job Description Analyzer** - Get instant match scores and skill gap analysis
- 📄 **Resume Tailor Engine** - AI-powered resume optimization
- 📊 **Application Tracker** - Track all your job applications in one place
- 💼 **Interview Prep** - Generate practice questions and sample answers
- ✨ **Portfolio Builder** - Create and deploy your portfolio in minutes
- 🤖 **Career AI Chatbot** - Get personalized career advice
- 🗺️ **Skill Gap Roadmap** - 30/60/90-day learning plans

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS, Shadcn/UI, Zustand
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL (Neon)
- **Authentication**: NextAuth.js (Credentials provider)
- **AI**: OpenRouter API (Google Gemini, Anthropic Claude, OpenAI GPT models)
- **File Uploads**: Direct PDF parsing with pdf-parse
- **Deployment**: Vercel (Frontend + API), Neon (PostgreSQL Database)

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (Neon recommended)
- OpenRouter API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd WorkHub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

See `.env.example` for all required environment variables.

## Project Structure

```
/workhub
  /app
    /dashboard        # Dashboard pages
    /auth             # Authentication pages
    /api              # API routes
  /components         # React components
  /lib                # Utilities and configurations
  /prisma             # Database schema
  /store              # Zustand state management
  /types              # TypeScript types
```

## Database Schema

- **User** - User accounts
- **Resume** - Uploaded resumes
- **Job** - Job applications
- **Portfolio** - User portfolios

## API Routes

- `/api/analyze` - Job description analysis
- `/api/resume/upload` - Resume upload and tailoring
- `/api/interview` - Interview question generation
- `/api/portfolio` - Portfolio creation
- `/api/chat` - Career chatbot
- `/api/auth/[...nextauth]` - Authentication

## Development

- Run Prisma Studio: `npm run db:studio`
- Generate Prisma client: `npm run db:generate`
- Push database changes: `npm run db:push`

## License

MIT


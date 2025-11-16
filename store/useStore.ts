import { create } from "zustand"

interface AppState {
  user: {
    id: string | null
    email: string | null
    name: string | null
  }
  resumes: any[]
  jobs: any[]
  portfolios: any[]
  setUser: (user: AppState["user"]) => void
  addResume: (resume: any) => void
  addJob: (job: any) => void
  addPortfolio: (portfolio: any) => void
}

export const useStore = create<AppState>((set) => ({
  user: {
    id: null,
    email: null,
    name: null,
  },
  resumes: [],
  jobs: [],
  portfolios: [],
  setUser: (user) => set({ user }),
  addResume: (resume) => set((state) => ({ resumes: [...state.resumes, resume] })),
  addJob: (job) => set((state) => ({ jobs: [...state.jobs, job] })),
  addPortfolio: (portfolio) => set((state) => ({ portfolios: [...state.portfolios, portfolio] })),
}))


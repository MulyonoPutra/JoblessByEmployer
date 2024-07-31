import { User } from "./user"

export interface Seeker {
  id: string
  summary: any
  education: any[]
  experience: any[]
  skills: any[]
  resume: any
  coverLetter: any
  links: any[]
  desireSalary: any
  startDate: any
  license: any[]
  user: User
}

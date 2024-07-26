export interface User {
  id: string
  name: string
  email: string
  avatar: string
  phone: any
  role: string
  employer: {
    id: string
    accountName: string
    accountNumber: string
  }
}

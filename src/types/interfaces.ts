import { Moment } from 'moment'

export interface Transaction {
  id: number
  currency: string
  direction: 'in' | 'out'
  amount: number
  timestamp: Moment
}

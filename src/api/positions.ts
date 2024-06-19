import { api } from './axios'

export type Position = {
  date: string
  driver_number: number
  meeting_key: number
  position: number
  session_key: number
}

export type PositionsParams = {
  driver_number?: number
  meeting_key?: number
  session_key?: number
}

export const fetchPositions = async (params: PositionsParams = {}) =>
  (await api.get<Position[]>('/position', { params })).data

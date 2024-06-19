import { api } from './axios'

export type Session = {
  circuit_key: number
  circuit_short_name: string
  country_code: string
  country_key: number
  country_name: string
  date_end: string
  date_start: string
  gmt_offset: string
  location: string
  meeting_key: number
  session_key: number
  session_name: string
  session_type: string
  year: number
}

export type SessionsParams = {
  meeting_key?: number
  session_name?: string
  session_type?: string
}

export const fetchSessions = async (params: SessionsParams = {}) =>
  (await api.get<Session[]>('/sessions', { params })).data

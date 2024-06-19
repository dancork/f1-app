import { api } from './axios'

export type Meeting = {
  circuit_key: number
  circuit_short_name: string
  country_code: string
  country_key: number
  country_name: string
  date_start: string
  gmt_offset: string
  location: string
  meeting_key: number
  meeting_name: string
  meeting_official_name: string
  year: number
}

export type MeetingsParams = {
  year?: number
}

export const fetchMeetings = async (params: MeetingsParams = {}) =>
  (await api.get<Meeting[]>('/meetings', { params })).data

import { api } from './axios'

export type Driver = {
  broadcast_name: string
  country_code: string
  driver_number: number
  first_name: string
  full_name: string
  headshot_url: string
  last_name: string
  meeting_key: number
  name_acronym: string
  session_key: number
  team_colour: string
  team_name: string
}

export type DriversParams = {
  meeting_key?: number
  session_key?: number
}

export const fetchDrivers = async (params: DriversParams = {}) =>
  (await api.get<Driver[]>('/drivers', { params })).data

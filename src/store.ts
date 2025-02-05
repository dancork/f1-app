import { atom } from 'jotai'

import { Meeting } from './api/meetings'
import { DateTime } from 'luxon'

export const selectedYearAtom = atom<number>(DateTime.now().year)
export const selectedMeetingAtom = atom<Meeting | null>(null)

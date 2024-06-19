import { atom } from 'jotai'

import { Meeting } from './api/meetings'

export const selectedMeetingAtom = atom<Meeting | null>(null)

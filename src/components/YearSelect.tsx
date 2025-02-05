import { Select } from '@radix-ui/themes'
import { useAtom, useSetAtom } from 'jotai'
import { DateTime } from 'luxon'

import { selectedMeetingAtom, selectedYearAtom } from '../store'
import { useMemo } from 'react'

export const YearSelect = () => {
  const [selectedYear, setSelectedYear] = useAtom(selectedYearAtom)
  const setSelectedMeeting = useSetAtom(selectedMeetingAtom)
  const years = useMemo(
    () =>
      Array(3)
        .fill(null)
        .map((_, index) => DateTime.now().year - index),
    [],
  )

  return (
    <Select.Root
      size="3"
      value={selectedYear.toString()}
      onValueChange={value => {
        setSelectedMeeting(null)
        setSelectedYear(Number.parseInt(value))
      }}
    >
      <Select.Trigger
        variant="surface"
        aria-label="Choose a year to view grand prix data for"
      />
      <Select.Content>
        {years?.map(year => (
          <Select.Item key={year} value={year.toString()}>
            {year}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

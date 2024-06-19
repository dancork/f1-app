import { DataList, Flex, Heading } from '@radix-ui/themes'
import { useAtomValue } from 'jotai'
import { DateTime } from 'luxon'

import { selectedMeetingAtom } from '../store'

export const GrandPrixHeader = () => {
  const selectedMeeting = useAtomValue(selectedMeetingAtom)

  if (!selectedMeeting) {
    return null
  }

  return (
    <Flex direction="column" gap="2" asChild>
      <header>
        <Heading size="7">{selectedMeeting.meeting_official_name}</Heading>
        <Flex direction="row" asChild>
          <DataList.Root orientation="vertical">
            <DataList.Item>
              <DataList.Label>Circuit</DataList.Label>
              <DataList.Value>
                {selectedMeeting.circuit_short_name},{' '}
                {selectedMeeting.country_name}
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Date</DataList.Label>
              <DataList.Value>
                {DateTime.fromISO(selectedMeeting.date_start).toLocaleString(
                  DateTime.DATE_MED,
                )}
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Flex>
      </header>
    </Flex>
  )
}

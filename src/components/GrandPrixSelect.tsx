import { useQuery } from '@tanstack/react-query'
import { Flex, Select, Skeleton, Text } from '@radix-ui/themes'
import { useAtom, useAtomValue } from 'jotai'

import { fetchMeetings } from '../api/meetings'
import { selectedMeetingAtom, selectedYearAtom } from '../store'

export const GrandPrixSelect = () => {
  const selectedYear = useAtomValue(selectedYearAtom)
  const [selectedMeeting, setSelectedMeeting] = useAtom(selectedMeetingAtom)
  const { data: meetings, isLoading: isMeetingsLoading } = useQuery({
    queryKey: ['meetings', selectedYear],
    queryFn: () => fetchMeetings({ year: selectedYear }),
  })

  return (
    <Select.Root
      size="3"
      value={selectedMeeting?.meeting_key.toString()}
      onValueChange={value =>
        setSelectedMeeting(
          meetings?.find(({ meeting_key }) => meeting_key === Number(value)) ??
            null,
        )
      }
    >
      <Skeleton loading={isMeetingsLoading}>
        {meetings?.length ? (
          <Select.Trigger
            variant="surface"
            aria-label="Choose a Grand Prix to view data"
            placeholder="Select Grand Prix"
          />
        ) : (
          <Flex align="center">
            <Text>No data found for this year</Text>
          </Flex>
        )}
      </Skeleton>
      <Select.Content>
        {meetings?.map(meeting => (
          <Select.Item
            key={meeting.meeting_key}
            value={meeting.meeting_key.toString()}
          >
            {meeting.meeting_name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

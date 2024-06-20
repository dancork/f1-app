import { useQuery } from '@tanstack/react-query'
import { Flex, Select, Skeleton } from '@radix-ui/themes'
import { useAtom } from 'jotai'
import { DateTime } from 'luxon'

import { fetchMeetings } from '../api/meetings'
import { selectedMeetingAtom } from '../store'

export const GrandPrixSelect = () => {
  const [selectedMeeting, setSelectedMeeting] = useAtom(selectedMeetingAtom)
  const { data: meetings, isLoading: isMeetingsLoading } = useQuery({
    queryKey: ['meetings'],
    queryFn: () => fetchMeetings({ year: DateTime.now().year }),
  })

  return (
    <Flex direction="column" asChild>
      <header>
        <Select.Root
          size="3"
          value={selectedMeeting?.meeting_key.toString()}
          onValueChange={value =>
            setSelectedMeeting(
              meetings?.find(
                ({ meeting_key }) => meeting_key === Number(value),
              ) ?? null,
            )
          }
        >
          <Skeleton loading={isMeetingsLoading}>
            <Select.Trigger
              variant="surface"
              aria-label="Choose a Grand Prix to view data"
              placeholder="Select Grand Prix"
            />
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
      </header>
    </Flex>
  )
}

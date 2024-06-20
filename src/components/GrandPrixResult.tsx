import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Avatar,
  Card,
  Flex,
  Heading,
  Inset,
  Reset,
  Text,
} from '@radix-ui/themes'
import { useAtomValue } from 'jotai'
import { first, last } from 'remeda'
import { ThickArrowUpIcon, ThickArrowDownIcon } from '@radix-ui/react-icons'

import { fetchSessions } from '../api/sessions'
import { selectedMeetingAtom } from '../store'
import { fetchDrivers } from '../api/drivers'
import { fetchPositions } from '../api/positions'

import { useDriverPositions } from '../hooks/useDriverPositions'

export const GrandPrixResult = () => {
  const selectedMeeting = useAtomValue(selectedMeetingAtom)

  const { data: sessions, isLoading: isSessionsLoading } = useQuery({
    queryKey: ['meetings', selectedMeeting, 'sessions'],
    queryFn: () =>
      fetchSessions({
        meeting_key: selectedMeeting?.meeting_key,
        session_name: 'Race',
        session_type: 'Race',
      }),
    enabled: Boolean(selectedMeeting),
  })

  const { session_key } = last(sessions ?? []) ?? {}

  const { data: positions, isLoading: isPositionsLoading } = useQuery({
    queryKey: ['sessions', sessions?.[0].session_key, 'positions'],
    queryFn: () => fetchPositions({ session_key }),
    enabled: session_key !== undefined,
  })

  const { data: drivers, isLoading: isDriversLoading } = useQuery({
    queryKey: ['sessions', sessions?.[0].session_key, 'drivers'],
    queryFn: () => fetchDrivers({ session_key }),
    enabled: session_key !== undefined,
  })

  // simplify the position data into an object of arrays
  // indexed by driver number
  const driverPositions = useDriverPositions(positions)

  const orderedDrivers = useMemo(() => {
    if (!drivers) return []
    if (!driverPositions) return []
    return drivers.toSorted(
      (a, b) =>
        (last(driverPositions[a.driver_number] ?? []) ?? 0) -
        (last(driverPositions[b.driver_number] ?? []) ?? 0),
    )
  }, [drivers, driverPositions])

  if (
    !selectedMeeting ||
    isSessionsLoading ||
    isDriversLoading ||
    isPositionsLoading
  ) {
    return null
  }

  return (
    <Flex direction="column" gap="2" asChild>
      <Reset>
        <ul aria-label="Grand prix result by driver">
          {orderedDrivers.map(driver => {
            const startPosition =
              first(driverPositions[driver.driver_number] ?? []) ?? 0
            const finalPosition =
              last(driverPositions[driver.driver_number] ?? []) ?? 0
            const positionsGained = startPosition - finalPosition

            return (
              <Card
                key={driver.driver_number}
                style={{
                  backgroundImage: `linear-gradient(90deg, #${driver.team_colour} 0%, transparent 15%)`,
                }}
                aria-label={`${driver.full_name} finished P${finalPosition} for ${driver.team_name}`}
                asChild
              >
                <li>
                  <Flex align="center" justify="between">
                    <Flex
                      align="center"
                      justify="start"
                      gap={finalPosition <= 3 ? '3' : '2'}
                    >
                      {finalPosition <= 3 && (
                        <Inset side="left">
                          <Avatar
                            size="5"
                            src={driver.headshot_url}
                            fallback={driver.name_acronym}
                            aria-hidden
                          />
                        </Inset>
                      )}
                      <Flex direction="column">
                        <Flex gap="2" asChild>
                          <Heading
                            as="h2"
                            size={finalPosition <= 3 ? '5' : '3'}
                          >
                            <Text weight="medium">{driver.full_name}</Text>
                            <Text color="gray" weight="light" aria-hidden>
                              #{driver.driver_number}
                            </Text>
                          </Heading>
                        </Flex>
                        <Text size={finalPosition <= 3 ? '3' : '1'}>
                          {driver.team_name}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex direction="column" align="end">
                      <Text
                        size={finalPosition <= 3 ? '5' : '3'}
                        weight="medium"
                      >
                        P{finalPosition}
                      </Text>

                      {positionsGained > 0 && (
                        <Flex align="center">
                          <ThickArrowUpIcon color="green" aria-hidden />
                          <Text
                            size="2"
                            color="gray"
                            aria-label={`${positionsGained} positions gained`}
                          >
                            {positionsGained}
                          </Text>
                        </Flex>
                      )}
                      {positionsGained < 0 && (
                        <Flex align="center">
                          <ThickArrowDownIcon color="red" aria-hidden />
                          <Text
                            size={finalPosition <= 3 ? '2' : '1'}
                            color="gray"
                            aria-label={`${positionsGained} positions lost`}
                          >
                            {Math.abs(positionsGained)}
                          </Text>
                        </Flex>
                      )}
                    </Flex>
                  </Flex>
                </li>
              </Card>
            )
          })}
        </ul>
      </Reset>
    </Flex>
  )
}

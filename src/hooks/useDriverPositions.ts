import { useMemo } from 'react'

import { Position } from '../api/positions'

export const useDriverPositions = (positions?: Position[]) =>
  useMemo(() => {
    if (!positions) return {}
    return positions.reduce<Record<number, number[]>>(
      (acc, { driver_number, position }) => {
        acc[driver_number] ??= []
        acc[driver_number].push(position)
        return acc
      },
      {},
    )
  }, [positions])

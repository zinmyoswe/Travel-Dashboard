import React from 'react'
import { calculateTrendPercentage, cn } from '~/lib/utils'

const StatsCard  = ({
  headerTitle,
  total,
  lastMonthCount,
  currentMonthCount}: StatsCard) => {
  const { trend, percentage } = calculateTrendPercentage(currentMonthCount, lastMonthCount);
  const isDecrement = trend === 'decrement';

  return (
    <div>
      StatsCard  
    </div>
  )
}

export default StatsCard 
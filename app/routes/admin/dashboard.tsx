import { StatsCard, TripCard } from 'components';
import React from 'react'
import { dashboardStats, user, allTrips } from '~/constants';

const dashboard = () => {

    
    const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } = dashboardStats;
  return (
    <main>
    <section className='flex flex-col gap-6'>
      <StatsCard 
        headerTitle="Total Users"
        total={totalUsers}
        currentMonthCount={usersJoined.currentMonth}
        lastMonthCount = {usersJoined.lastMonth}
      />

      <StatsCard 
        headerTitle="Total Trips"
        total={totalTrips}
        currentMonthCount={tripsCreated.currentMonth}
        lastMonthCount = {tripsCreated.lastMonth}
      />

      <StatsCard 
        headerTitle="Active Users Today"
        total={userRole.total}
        currentMonthCount={userRole.currentMonth}
        lastMonthCount = {userRole.lastMonth}
      />
    </section>
    <TripCard />
    </main>
  )
}

export default dashboard
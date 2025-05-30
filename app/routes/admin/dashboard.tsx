import { StatsCard, TripCard } from 'components';
import React from 'react'

const dashboard = () => {

    const user = { name: 'Zin'};
    const dashboardStats = {
        totalUsers: 12450,
        usersJoined: { currentMonth: 218, lastMonth: 176 },
        totalTrips: 3210,
        tripsCreated: { currentMonth: 150, lastMonth: 250 },
        userRole: { total: 62, currentMonth: 25, lastMonth: 15},
    }

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
        headerTitle="Total Users"
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
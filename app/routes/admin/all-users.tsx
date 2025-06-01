import { Header } from 'components'
import React from 'react'
import {GridComponent} from "@syncfusion/ej2-react-grids";
import { users } from '~/constants'

const AllUsers = () => {
  return (
    <main className='all-users wrapper'>
      <Header 
        title='Manage Users'
        description='filter, sort, and access detailed user profiles'
      />

      <GridComponent dataSource={users}>

      </GridComponent>
    </main>
  )
}

export default AllUsers
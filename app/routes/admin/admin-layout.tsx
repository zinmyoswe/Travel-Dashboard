import React from 'react'
import {SidebarComponent} from "@syncfusion/ej2-react-navigations";
import { NavItems } from 'components';
import { Outlet } from 'react-router';

const AdminLayout = () => {
  return (
    <div className='admin-layout'>
        MobileSidebar
        <aside className='w-full max-w-[270px] hidden lg:block'>
            <SidebarComponent width={270} enableGestures={false}>
                <NavItems />
            </SidebarComponent>
        </aside>

        <aside className='children'>
            <Outlet />
        </aside>
    </div>
  )
}

export default AdminLayout
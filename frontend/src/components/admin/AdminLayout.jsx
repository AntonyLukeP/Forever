import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa6';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);;

  const toggleSidebar = ()=>
  {
    setIsSidebarOpen(!isSidebarOpen);
  }


  return (
    <div className='flex flex-col md:flex-row relative' >
        <div className='flex md:hidden p-4 bg-gray-900 text-white z-20'>
            <button onClick={toggleSidebar} className='cursor-pointer' ><FaBars   /> </button>             
            <h1 className='ml-4 text-xl font-medium' >Admin Dashboard</h1>
        </div>
        {isSidebarOpen && 
        (
            <div className='fixed inset-0 bg-black opacity-50 z-10 md:hidden' 
            onClick={toggleSidebar}
            ></div>
        )}

        <div className={`bg-gray-900 w-64 min-h-screen fixed transform ${isSidebarOpen?"translate-x-0":"-translate-x-full"} transition-transform duration-300 md:translate-x-0 md:static md:block z-30`} >
            <AdminSidebar toggleSidebar={toggleSidebar}/>
        </div>
        <div className='grow px-6 py-4' >
            <Outlet/>
        </div>

    </div>
  )
}

export default AdminLayout
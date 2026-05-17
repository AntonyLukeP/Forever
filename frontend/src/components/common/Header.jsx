import React from 'react'
import TopBar from '../layout/TopBar'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header className='border-b border-gray-200'>
    {/* Topbar */}
    <TopBar/>
    {/* Navbar */}
    <Navbar/>
    </header>
  )
}

export default Header
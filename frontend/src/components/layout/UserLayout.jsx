import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Home from '../../pages/Home'
import { Outlet } from 'react-router-dom'

export const UserLayout = () => {
  return (
    <>
    {/* Header */}
    <Header/>
    <main>
      <Outlet />
    </main>
    <Footer/>
    </>
  )
}

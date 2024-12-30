import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { customSignOut } from '../../utils/libs/logout'
import { Logout, Menu } from '@mui/icons-material'
import { CircularProgress, IconButton } from '@mui/material'
import { useSelector } from 'react-redux'

export default function Dashboard ({ children }) {
const {user} = useSelector((s) => s.auth)
  const getQuiz = () => {

  }
  useEffect(() => {
    getQuiz();
  }, []);
  return (
    <>
      <header className='bg-white relative h-[60px] z-40 w-full'>
        <nav className='text-slate-800 bg-white z-40 px-5 items-center fixed shadow-lg w-full flex justify-between h-[60px] top-0'>
          <div>
           {/* <IconButton color='inherit' >  
            <Menu color='inherit'  />
            </IconButton> */}
            <span className='ml-2' >Welcome { " " + user.name}</span>
          </div>
          <div>
              <IconButton color='inherit' onClick={customSignOut} >
                <Logout color='inherit' />
              </IconButton>
          </div>
        </nav>
      </header>
      {/* <aside>Side Bar</aside> */}
      <main className='bg-[#f1f1f1] p-5 min-h-[100vh] ' >{children ? children : <Outlet />}</main>
     
    </>
  )
}

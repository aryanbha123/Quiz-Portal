import { Menu, Search } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Header () {
  return (
    <>
      <header className='relative h-[80px] w-full'>
        <nav className='fixed shadow-md w-full flex justify-between px-4  items-center h-[80px] top-0  bg-white z-40'>
          <div className='flex items-center gap-6' >
            {/* <video
              className='h-[70px]'
              src='/assets/techease.mp4'
              muted
              loop
              playsInline
              autoPlay
              alt=''
            /> */}
            <img src='/assets/logo.jpg' className='h-14' alt='' />
            <form className='relative lg:flex  hidden  items-center' >
              <input type='search' placeholder='Search here ...' className='md:w-96 h-10 rounded-3xl border-[1px] border-black   outline-none pr-4 pl-10
              ' />
              <Search className='absolute left-3' />
            </form> 
          </div>
          <div className='lg:flex hidden'>
            <div className='flex gap-2'>
              <div className="flex items-center gap-6 mr-5">
                <Link>Home</Link>
                <Link>Team</Link>
                <Link>Roadmaps</Link>
                <Link>Mentorship</Link>
                <Link>Practice</Link>
              </div>
              <Link to='/login' class='px-6 py-2 bg-black text-white font-medium rounded-md shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-200'>
                Login
              </Link>
              <Link to='/signup' class='px-6 py-2 bg-[#0149ad] text-white font-medium rounded-md shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-200'>
                Sign Up
              </Link>

            </div>
          </div>
          <div className='lg:hidden flex'>
            <IconButton>
              <Menu />
            </IconButton>
          </div>
        </nav>
      </header>
    </>
  )
}

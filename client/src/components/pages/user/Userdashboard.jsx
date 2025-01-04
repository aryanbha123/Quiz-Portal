import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { customSignOut } from '../../utils/libs/logout'
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Badge
} from '@mui/material'
import {
  Logout,
  Settings,
  Notifications,
  Menu as MenuIcon,
  Close,
  Home,
  Book,
  Analytics,
  LocationCity,
  Person2,
  LightMode,
  DarkMode,
  PowerSettingsNew,
  ArrowDropDownCircle,
  ArrowDropDown,
  ShortText,
  ArrowRight
} from '@mui/icons-material'
import { useSelector } from 'react-redux'

const NAV_ITEMS = [
  { icon: <Home color='inherit' />, label: 'Home', path: '/user' },
  { icon: <Book color='inherit' />, label: 'Practice', path: '/user/practice' },
  {
    icon: <Analytics color='inherit' />,
    label: 'Analysis',
    path: '/user/analysis'
  },
  {
    icon: <LocationCity color='inherit' />,
    label: 'Roadmaps',
    path: '/user/roadmaps'
  },
  {
    icon: <Person2 color='inherit' />,
    label: 'Profile',
    path: '/user/profile'
  },
  {
    icon: <Settings color='inherit' />,
    label: 'Settings',
    path: '/user/settings'
  }
]

export default function UserDashboard ({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => setMenuOpen(!menuOpen)
  const [darkMode, setDarkMode] = useState(false)

  const toggleMode = () => {
    localStorage.setItem('mode', `${!darkMode ? 'dark' : 'light'}`)
    setDarkMode(!darkMode) // async operation
  }
  useEffect(() => {
    const mode = localStorage.getItem('mode')
    if (mode === 'dark') {
      document.getElementById('root').classList.add('dark')
      setDarkMode(true)
    } else {
      document.getElementById('root').classList.remove('dark')
      setDarkMode(false)
    }
  }, [darkMode])
  const { user } = useSelector(s => s.auth)

  const handleLogout = async () => await customSignOut()
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location])
  return (
    <>
      <Header
        toggleMode={toggleMode}
        darkMode={darkMode}
        user={user}
        handleLogout={handleLogout}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        
      />
      <Drawer setMenuOpen={setMenuOpen} user={user} menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <main className='pr-5 pl-[70px] py-5 dark:bg-gray-700 bg-gray-50 min-h-[calc(100vh-75px)] text-gray-800 transition-all'>
        {children || <Outlet />}
      </main>
    </>
  )
}

function Drawer ({setMenuOpen, user, menuOpen, toggleMenu }) {
  return (
    <aside
      onMouseEnter={() => {setMenuOpen(true)}}
      onMouseLeave={() => {setMenuOpen(false)}}
      className={`${
        menuOpen ? 'translate-x-0' : '-translate-x-[200px]'
      } transition-all duration-300 border-r-[.5px] text-gray-700 border-gray-300 fixed top-0 h-[calc(100vh-0px)] bg-white shadow-sm w-[250px] z-[48]`}
    >
      <div className='flex relative h-full w-full flex-col'>
        <div className='relative h-[10px] right-2 flex justify-end top-5'>
          <IconButton color='inherit' className=''>
            {!menuOpen ? (
              <ShortText />
            ) : (
              <ArrowRight
                className={`animate-rotation  transition-all duration-1000`}
              />
            )}
          </IconButton>
        </div>
        {menuOpen && (
          <div className='flex pt-7 pb-4 mt-3 flex-col gap-2 items-center'>
            <Avatar
              sx={{ width: 100, height: 100 }}
              className='h-28 w-28'
              src={user.image}
            />
            <div className='text-center mt-3'>
              <span className='text-lg font-bold'>{user.name}</span>
              {menuOpen && (
                <div className='text-sm text-gray-600'>{user.email}</div>
              )}
            </div>
          </div>
        )}
        <ul className={`flex ${menuOpen ? 'px-5 ' : 'mt-10'} flex-col`}>
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex gap-3 ${
                !menuOpen ? 'justify-end ' : 'justify-start'
              } items-center rounded-lg p-2 hover:bg-gray-100 transition-all`}
            >
              <IconButton color='inherit'>{item.icon}</IconButton>
              {menuOpen && <span className='font-medium'>{item.label}</span>}
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  )
}

function Header ({
  user,
  menuOpen,
  setMenuOpen,
  handleLogout,
  darkMode,
  toggleMode
}) {
  return (
    <>
      <header className='relative h-[70px]'>
        <nav className='fixed shadow-sm dark:text-gray-50 bg-blend-difference text-gray-600  h-[70px] items-center pr-5 pl-[55px] flex justify-between z-40 w-full top-0 dark:bg-gray-800 bg-white'>
          <div className='flex gap-1 items-center'>
            <video
              src='/assets/techease.mp4'
              autoPlay
              loop
              playsInline
              muted
              className='h-[60px] rounded-[20px]'
            ></video>
          </div>
          <div className='flex items-center gap-3'>
            <Link
              className='flex items-center rounded-md border dark:text-gray-700 dark:bg-gray-50 border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
              type='button'
            >
              Homepage
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-4 h-4 ml-1.5'
              >
                <path
                  fillRule='evenodd'
                  d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
                  clipRule='evenodd'
                />
              </svg>
            </Link>
            <IconButton color='inherit' onClick={toggleMode}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            <IconButton color='inherit' onClick={customSignOut}>
              <PowerSettingsNew color='inherit' />
            </IconButton>
            <Avatar src={`${user.image}`} />
          </div>
        </nav>
      </header>
    </>
  )
}

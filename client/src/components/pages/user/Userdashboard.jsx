import React, { useEffect, useState } from 'react'
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { customSignOut } from '../../utils/libs/logout'
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material'
import {
  Logout,
  PersonAdd,
  Settings,
  Menu as MenuIcon,
  DarkMode,
  LightMode,
  Close,
  Analytics,
  Book,
  Person2,
  LocationCity,
  Home
} from '@mui/icons-material'
import { useSelector } from 'react-redux'

export default function Userdashboard ({ children }) {
  const navigate = useNavigate()
  const location  = useLocation();
  const [menuOpen , setMenuOpen]  = useState(true);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }


  useEffect(() => {
    setMenuOpen(false);
  } ,[location])
  const { user } = useSelector(s => s.auth)
  const [darkMode, setDarkMode] = useState(false)
  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') {
      setDarkMode(true)
      document.getElementById('root').classList.add('dark')
    }
  }, [])
  const toggleTheme = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      localStorage.setItem('theme', 'light')
      document.getElementById('root').classList.remove('dark')
    } else {
      localStorage.setItem('theme', 'dark')
      document.getElementById('root').classList.add('dark')
    }
  }
  const handleLogout = async () => {
    await customSignOut()
    return <Navigate to={'/'} />
  }
  return (
    <>
      <Header
        toggleTheme={toggleTheme}
        user={user}
        darkMode={darkMode}
        handleLogout={handleLogout}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
      />
      <Drawer
        user={user}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        handleLogout={handleLogout}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
      />
      <main className='px-7 py-5 dark:bg-gray-800 bg-[#f2f2f2] min-h-[calc(100vh-75px)] dark:text-[#f1f1f1] text-gray-800'>
        {children ? children : <Outlet />}
      </main>
    </>
  )
}

function Drawer ({ user , menuOpen , toggleMenu }) {
  return (
    <>
      <aside className={`${menuOpen? ' translate-x-0 ' : '-translate-x-full ' } transition-all duration-200 fixed  top-[0px] h-[calc(100vh-0px)] rounded-r-2xl z-[48] dark:bg-gray-800 dark:text-[#f1f1f1] bg-[#fff] shadow-lg w-[230px]`}>
        <div className='flex relative h-full w-full  flex-col h'>
          <div className='absolute right-3 top-3'>
            <IconButton color='inherit'  onClick={toggleMenu}>
              <Close color='inherit' />
            </IconButton>
          </div>
          <div className='flex py-7 mt-3 flex-col gap-2 items-center'>
            <Avatar
              sx={{
                width: '100px',
                height: '100px'
              }}
              className='h-28 w-28'
              src={user.image}
            ></Avatar>
            <div className='relative  items-center flex flex-col font-[Lato] justify-center'>
              <span className=''>{user.name}</span>
              <span className='text-sm'>{user.email}</span>
            </div>
          </div>
          <ul className='flex px-5 dark:text-[#f1f1f1] flex-col gap-3'>
            <Link className='flex gap-3 justify-start items-center  text-whit rounded-3xl '>
            <IconButton color='inherit' >
                <Home color='inherit' />
            </IconButton>
              Home
            </Link>
            <Link className='flex gap-3 justify-start items-center   rounded-3xl'>
              <IconButton color='inherit' >
                <Book color='inherit' />
              </IconButton>
              Learning
            </Link>
            <Link className='flex gap-3 justify-start items-center   rounded-3xl'>
              <IconButton color='inherit' >
                <Analytics color='inherit' />
              </IconButton>
              Analysis
            </Link>
            <Link className='flex gap-3 justify-start items-center   rounded-3xl'>
              <IconButton color='inherit' >
                <LocationCity color='inherit' />
              </IconButton>
              Roadmaps
            </Link>
            <Link className='flex gap-3 justify-start items-center dark:hover:bg-[#f5f5f5] dark:hover:text-gray-900 rounded-3xl'>
              <IconButton color='inherit' >
                <Person2 color='inherit' />
              </IconButton>
              Profile
            </Link>
            <Link className='flex gap-3 justify-start items-center dark:hover:bg-[#f5f5f5] dark:hover:text-gray-900 rounded-3xl'>
              <IconButton color='inherit' >
                <Settings color='inherit' />
              </IconButton>
              Settings
            </Link>
          </ul>
        </div>
      </aside>
    </>
  )
}

function Header ({ darkMode, menuOpen , toggleMenu, toggleTheme, handleLogout, user }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <header className='dark:bg-gray-900 dark:text-[#f1f1f1] text-gray-800  h-[75px]  relative w-full bg-white'>
        <nav className='dark:bg-gray-900 dark:text-[#f1f1f1] text-gray-800 bg-white flex justify-between px-5 items-center shadow-md z-[48] top-0 h-[75px] fixed w-full'>
          <div>
            <IconButton onClick={toggleMenu} color='inherit'>
              <MenuIcon color='inherit' />
            </IconButton>
          </div>
          <div className='flex '>
            <IconButton onClick={toggleTheme}>
              {darkMode ? (
                <>
                  <LightMode sx={{ color: '#f1f1f1' }} />
                </>
              ) : (
                <>
                  <DarkMode />
                </>
              )}
            </IconButton>
            <Tooltip title='Account settings'>
              <IconButton
                onClick={handleClick}
                size='small'
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar src={`${user.image}`} sx={{ width: 36, height: 36 }}>
                  M
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id='account-menu'
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0
                    }
                  }
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
              <Divider />
              <MenuItem
                sx={{
                  margin: '0 20px 0 0'
                }}
                onClick={handleClose}
              >
                <ListItemIcon>
                  <Settings fontSize='small' />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize='small' />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </nav>
      </header>
    </>
  )
}

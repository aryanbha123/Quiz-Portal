import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { customSignOut } from '../../utils/libs/logout';
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Badge
} from '@mui/material';
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
  Person2
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const NAV_ITEMS = [
  { icon: <Home color='inherit' />, label: 'Home', path: '/user' },
  { icon: <Book color='inherit' />, label: 'Practice', path: '/user/practice' },
  { icon: <Analytics color='inherit' />, label: 'Analysis', path: '/user/analysis' },
  { icon: <LocationCity color='inherit' />, label: 'Roadmaps', path: '/user/roadmaps' },
  { icon: <Person2 color='inherit' />, label: 'Profile', path: '/user/profile' },
  { icon: <Settings color='inherit' />, label: 'Settings', path: '/user/settings' }
];

export default function UserDashboard({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const { user } = useSelector(s => s.auth);

  const handleLogout = async () => await customSignOut();
  const location  = useLocation();

  useEffect(() => {
      setMenuOpen(false);
  } , [location])
  return (
    <>
      <Header
        user={user}
        handleLogout={handleLogout}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
      />
      <Drawer
        user={user}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
      />
      <main className="p-4 mt-[70px] bg-gray-100 min-h-[calc(100vh-75px)] text-gray-800 transition-all">
        {children || <Outlet />}
      </main>
    </>
  );
}

function Drawer({ user, menuOpen, toggleMenu }) {
  return (
    <aside
      className={`${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-all duration-300 fixed top-0 h-[calc(100vh-0px)] bg-white shadow-xl w-[250px] z-[48]`}
    >
      <div className="flex relative h-full w-full flex-col">
        <div className="absolute right-3 top-3">
          <IconButton color="inherit" onClick={toggleMenu}>
            <Close />
          </IconButton>
        </div>
        <div className="flex pt-7 pb-4 mt-3 flex-col gap-2 items-center">
          <Avatar
            sx={{ width: 100, height: 100 }}
            className="h-28 w-28"
            src={user.image}
          />
          <div className="text-center mt-3">
            <span className="text-lg font-bold">{user.name}</span>
            <div className="text-sm text-gray-600">{user.email}</div>
          </div>
        </div>
        <ul className="flex px-5 flex-col">
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex gap-3 justify-start items-center rounded-lg p-2 hover:bg-gray-100 transition-all"
            >
              <IconButton color="inherit">{item.icon}</IconButton>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function Header({ user, menuOpen, toggleMenu, handleLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const notificationOpen = Boolean(notificationAnchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotificationAnchorEl(null);
  };

  return (
    <header className="bg-white shadow-md z-[48] w-full fixed top-0 left-0">
      <nav className="flex justify-between px-5 items-center py-3">
        <div>
          <IconButton onClick={toggleMenu} color="inherit">
            <MenuIcon />
          </IconButton>
        </div>
        <div className="flex items-center gap-4">
          <Tooltip title="Notifications">
            <IconButton onClick={handleNotificationClick} color="inherit">
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar src={user.image} sx={{ width: 36, height: 36 }} />
            </IconButton>
          </Tooltip>
        </div>
      </nav>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
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
              borderRadius: '8px',
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={notificationAnchorEl}
        open={notificationOpen}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
            },
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <span>No new notifications</span>
        </MenuItem>
      </Menu>
    </header>
  );
}

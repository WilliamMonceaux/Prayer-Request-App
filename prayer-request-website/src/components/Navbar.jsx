'use client';
import Link from 'next/link';
import * as React from 'react';
import PropTypes from 'prop-types';
import PrayerHands from 'next/image';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useUserContext } from '@/context/UserContext';

const drawerWidth = 240;
const pages = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Prayer Meditation',
    path: '/meditation',
  },
  {
    title: 'Request Prayers',
    path: '/request',
  },
  {
    title: 'About Me',
    path: '/about',
  },
];

const settingsLoggedIn = [
  {
    title: 'Dashboard',
    path: '/dashboard',
  },
  {
    title: 'Logout',
    path: '#',
  },
];

const settingsLoggedOut = [
  {
    title: 'Sign In',
    path: '/signin',
  },
  {
    title: 'Sign Up',
    path: '/signup',
  },
];

function Navbar(props) {
  const { currentUser, logout } = useUserContext();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const userInitial = currentUser?.username
    ? currentUser.username.charAt(0).toUpperCase()
    : '';

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontSize: '2.4rem' }}>
        Prayer App
      </Typography>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem key={page.title} disablePadding>
            <ListItemButton
              component={Link}
              href={page.path}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText
                primary={page.title}
                slotProps={{
                  primary: {
                    sx: { fontSize: '1.4rem' },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <CssBaseline />
      <AppBar
        position="sticky"
        component="nav"
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ justifyContent: 'end' }}>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              component={Link}
              href="/"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <PrayerHands
                src="/images/praying-hands.png"
                alt="Prayer Hands Logo"
                width={50}
                height={50}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: 'black',
                  fontSize: '2.4rem',
                  flexGrow: 1,
                  mx: 1,
                  display: { xs: 'block', sm: 'block' },
                }}
              >
                Prayer App
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={Link}
                href={page.path}
                sx={{
                  fontSize: { md: '1.4rem', xl: '1.6rem' },
                  fontWeight: 500,
                  color: 'black',
                  mr: 1,
                  textTransform: 'none',
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon sx={{ fontSize: '2.5rem', color: 'black' }} />
          </IconButton>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar src={currentUser?.profilePicture} sx={{ width: 40, height: 40 }}>
                {currentUser?.username?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {(currentUser ? settingsLoggedIn : settingsLoggedOut).map((setting) => (
                <MenuItem
                  key={setting.title}
                  onClick={(e) => {
                    if (setting.title === 'Logout') {
                      e.preventDefault();
                      logout();
                    }
                    handleCloseUserMenu();
                  }}
                  component={Link}
                  href={setting.path}
                >
                  <Typography
                    sx={{
                      fontSize: { md: '1.4rem', xl: '2.0rem' },
                      textAlign: 'center',
                    }}
                  >
                    {setting.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export { Navbar };

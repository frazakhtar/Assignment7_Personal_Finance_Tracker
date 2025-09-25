import React, {useState} from 'react'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import {Link} from 'react-router-dom'
import {Close} from '@mui/icons-material'

const Navbar = () => {
  const [anchorNav, setAnchorNav] = useState(null)
  const openMenu = (e) => {
    setAnchorNav(e.currentTarget)
  }
  const closeMenu = () => {
    setAnchorNav(null)
  }
  return (
    <AppBar position="static" sx={{backgroundColor: '#FFFFFF', color: 'black'}}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{display: {xs: 'none', md: 'flex'}}}
        >
          <img src="LogoUpdated.png" alt="logo" style={{width: '3rem'}} />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}
        >
          FinTracker
        </Typography>
        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/transaction">
            Transaction
          </Button>
          <Button color="inherit" component={Link} to="/budget">
            Budget
          </Button>
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
        </Box>

        {/* This is for responsive screens */}

        <Box
          sx={{
            display: {xs: 'flex', md: 'none'},
            width: '100%',
            alignItems: 'center',
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{display: {xs: 'flex', md: 'none'}}}
          >
            <img src="LogoUpdated.png" alt="logo" style={{width: '2rem'}} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
          >
            FinTracker
          </Typography>
          <IconButton
            onClick={(e) => openMenu(e)}
            size="large"
            edge="end"
            color="inherit"
            sx={{display: {xs: 'flex', md: 'none'}}}
          >
            {anchorNav ? <Close /> : <MenuIcon />}
          </IconButton>
          <Menu
            anchorEl={anchorNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorNav)}
            onClose={closeMenu}
            sx={{display: {xs: 'flex', md: 'none'}}}
          >
            <MenuList sx={{m: 0.5, p: 0.5}} onClick={() => closeMenu()}>
              <MenuItem component={Link} to="/">
                Home
              </MenuItem>
              <MenuItem component={Link} to="/transaction">
                Transaction
              </MenuItem>
              <MenuItem component={Link} to="/budget">
                Budget
              </MenuItem>
              <MenuItem component={Link} to="/profile">
                Profile
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

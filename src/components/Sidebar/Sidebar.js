import { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Store,
  AccountCircle,
  Login,
  PersonAdd,
  Logout,
  People,
  Inventory,
  Place,
  ShoppingBag,
  Payment,
} from '@mui/icons-material'
import { Box, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from '@mui/material'
import { AppContext } from '../../contexts/AppContext'
import { logout } from '../../redux/actions/userActions'
// import HamsaIcon from '../../assets/hamsa.svg'
import role from '../../cofig/role'

export default function Sidebar() {
  const dispatch = useDispatch()

  const { toggleDrawerState, navigate, setDrawerState } = useContext(AppContext)

  const { userInfo } = useSelector((state) => state.userLogin)

  const selectOption = (path) => {
    navigate(path)
    setDrawerState(false)
  }
  const isActive = (path) => {
    return window.location.pathname === path
  }
  return (
    <Box sx={{ width: '100%' }} role='presentation'>
      <List
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader component='div' id='nested-list-subheader' onClick={() => navigate('/')}>
            <Typography variant='h6'>Hypnotic grow shop</Typography>
          </ListSubheader>
        }
      >
        {!userInfo ? (
          <>
            <ListItemButton
              style={{ backgroundColor: isActive('/sign-up') ? '#EEEEEE' : 'white' }}
              onClick={() => selectOption('/sign-up')}
              onKeyDown={toggleDrawerState(false)}
            >
              <ListItemIcon sx={{ minWidth: { xs: '35px', md: '45px' } }}>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary='Registrate' />
            </ListItemButton>
            <ListItemButton
              style={{ backgroundColor: isActive('/sign-in') ? '#EEEEEE' : 'white' }}
              onClick={() => selectOption('/sign-in')}
              onKeyDown={toggleDrawerState(false)}
            >
              <ListItemIcon sx={{ minWidth: { xs: '35px', md: '45px' } }}>
                <Login />
              </ListItemIcon>
              <ListItemText primary='Ingresar' />
            </ListItemButton>
          </>
        ) : (
          <>
            <ListItemButton
              style={{ backgroundColor: isActive('/') ? '#EEEEEE' : 'white' }}
              onClick={() => selectOption('/')}
              onKeyDown={toggleDrawerState(false)}
            >
              <ListItemIcon sx={{ minWidth: { xs: '35px', md: '45px' } }}>
                <Store />
              </ListItemIcon>
              <ListItemText primary='Tienda' />
            </ListItemButton>
            <ListItemButton
              style={{ backgroundColor: isActive('/profile') ? '#EEEEEE' : 'white' }}
              onClick={() => selectOption('/profile')}
              onKeyDown={toggleDrawerState(false)}
            >
              <ListItemIcon sx={{ minWidth: { xs: '35px', md: '45px' } }}>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary='Perfil' />
            </ListItemButton>
            {userInfo && [role.USER_ROLE].includes(userInfo.role) && (
              <>
                <ListItemButton
                  style={{ backgroundColor: isActive('/my-addresses') ? '#EEEEEE' : 'white' }}
                  onClick={() => selectOption('/my-addresses')}
                  onKeyDown={toggleDrawerState(false)}
                >
                  <ListItemIcon sx={{ minWidth: { xs: '35px', md: '45px' } }}>
                    <Place />
                  </ListItemIcon>
                  <ListItemText primary='Direcciones' />
                </ListItemButton>{' '}
                <ListItemButton
                  style={{ backgroundColor: isActive('/my-orders') ? '#EEEEEE' : 'white' }}
                  onClick={() => selectOption('/my-orders')}
                  onKeyDown={toggleDrawerState(false)}
                >
                  <ListItemIcon sx={{ minWidth: { xs: '35px', md: '45px' } }}>
                    <ShoppingBag />
                  </ListItemIcon>
                  <ListItemText primary='Ordenes' />
                </ListItemButton>
              </>
            )}
            {userInfo && [role.ADMIN_ROLE, role.SUPER_ROLE].includes(userInfo.role) && (
              <>
                <ListItemButton
                  style={{ backgroundColor: isActive('/users') ? '#EEEEEE' : 'white' }}
                  onClick={() => selectOption('/users')}
                  onKeyDown={toggleDrawerState(false)}
                >
                  <ListItemIcon sx={{ minWidth: { xs: '35px', md: '45px' } }}>
                    <People />
                  </ListItemIcon>
                  <ListItemText primary='Usuarios' />
                </ListItemButton>
                <ListItemButton
                  style={{ backgroundColor: isActive('/orders') ? '#EEEEEE' : 'white' }}
                  onClick={() => selectOption('/orders')}
                  onKeyDown={toggleDrawerState(false)}
                >
                  <ListItemIcon sx={{ minWidth: { xs: '35px', md: '45px' } }}>
                    <Payment />
                  </ListItemIcon>
                  <ListItemText primary='Ordenes' />
                </ListItemButton>{' '}
              </>
            )}
            {userInfo && [role.SUPER_ROLE].includes(userInfo.role) && (
              <ListItemButton
                style={{ backgroundColor: isActive('/suppliers') ? '#EEEEEE' : 'white' }}
                onClick={() => selectOption('/suppliers')}
                onKeyDown={toggleDrawerState(false)}
              >
                <ListItemIcon sx={{ minWidth: { xs: '35px', md: '45px' } }}>
                  <Inventory />
                </ListItemIcon>
                <ListItemText primary='Proveedores' />
              </ListItemButton>
            )}
            <ListItemButton onClick={() => dispatch(logout())}>
              <ListItemIcon sx={{ minWidth: { xs: '35px', md: '45px' } }}>
                <Logout />
              </ListItemIcon>
              <ListItemText primary='Salir' />
            </ListItemButton>
          </>
        )}
      </List>
    </Box>
  )
}

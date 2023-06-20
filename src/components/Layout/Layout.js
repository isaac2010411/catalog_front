import { Outlet } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import Grid from '@mui/material/Grid'
import Header from '../Header/Header'
import layoutStyles from './styles/layoutStyles'

const useStyles = makeStyles(layoutStyles)

const Layout = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.layoutContainer}>
      <Grid item xs={12} md={2}>
        <Header />
      </Grid>
      <Grid item xs={12} md={10} className={classes.ouletStyles}>
        <Outlet />
      </Grid>
    </Grid>
  )
}

export default Layout

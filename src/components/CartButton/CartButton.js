import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CartBadge from './components/CartBadge'
import { AppContext } from '../../contexts/AppContext'
import cartButtonStyles from './styles/cartButtonStyles'
import NotificationsBadge from './components/NotificationBadge'

const useStyles = makeStyles(cartButtonStyles)

const CartButton = () => {
  const navigate = useNavigate()
  const classes = useStyles()

  const { totalQuantity } = useContext(AppContext)

  return (
    <>
      <NotificationsBadge />
      <IconButton aria-label='cart' onClick={() => navigate('/cart')}>
        <CartBadge badgeContent={totalQuantity()} color='secondary'>
          <ShoppingCartIcon color='inherit' className={classes.animationIcon} />
        </CartBadge>
      </IconButton>
    </>
  )
}

export default CartButton

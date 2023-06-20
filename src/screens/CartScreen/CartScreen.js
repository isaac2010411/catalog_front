import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Divider, Grid, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CartList from '../../components/CartList/CartList'
import EmptyCart from './components/EmptyCart'
import Page from '../../components/Page/Page'
import { intermediateCurrency } from '../../shared/helpers/commonsFunctions'
import { AppContext } from '../../contexts/AppContext'
import styles from './styles/cartScreenStyles'

const CartScreen = () => {
  const navigate = useNavigate()

  const { totalPrice, cart, startOrder } = useContext(AppContext)

  const { userInfo } = useSelector((state) => state.userLogin)

  return (
    <Page title='Carrito'>
      {!cart.length > 0 ? (
        <Grid
          container
          rowSpacing={1}
          justifyContent='center'
          direction='row'
          alignItems='center'
          p={2}
          style={{ marginTop: '15px' }}
        >
          <EmptyCart />
        </Grid>
      ) : (
        !startOrder && (
          <>
            <Grid
              container
              rowSpacing={1}
              justifyContent='center'
              direction='row'
              alignItems='center'
              p={2}
              style={{ marginTop: '15px', marginBottom: '5rem' }}
            >
              <Grid item xs={12} md={8}>
                <h3 style={styles.resumeTitleCartStyles}>
                  <ShoppingCartIcon sx={styles.cartIcon} />
                  <span>Resumen del pedido</span>
                </h3>
                <Divider />
                <CartList />
                <Divider />

                <Typography align='right' style={{ padding: '15px 15px 0' }}>
                  Importe total <b style={{ fontSize: '25px' }}>{intermediateCurrency(totalPrice())}</b>
                </Typography>
              </Grid>
              {!userInfo ? (
                <Grid item xs={12} md={8} sx={styles.cartButtons}>
                  <Button variant='contained' color='secondary' onClick={() => navigate('/sign-in')}>
                    Logueate para continuar
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={12} md={8} sx={styles.cartButtons}>
                  <Button
                    variant='outlined'
                    color='secondary'
                    style={{ marginRight: '16px' }}
                    onClick={() => navigate('/')}
                  >
                    Ir a Tienda
                  </Button>
                  <Button variant='contained' color='secondary' onClick={() => navigate('/order-resume')}>
                    Iniciar Orden
                  </Button>
                </Grid>
              )}
            </Grid>
          </>
        )
      )}
    </Page>
  )
}

export default CartScreen

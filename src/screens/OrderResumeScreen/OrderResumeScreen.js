import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ShippingSelect from './components/ShippingSelect'
import OrderResume from './components/OrderResume'
import { AppContext } from '../../contexts/AppContext'
import { generateOrder } from '../../redux/actions/orderActions'
import styles from './styles/orderResumeScreenStyles'
import Page from '../../components/Page/Page'
import OrderConfirmationModal from './components/OrderConfirmationModal'
import { ORDER_GENERATE_RESET } from '../../redux/constants/ordersConstants'

const useStyles = makeStyles(styles)

const OrderResumeScreen = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { shippingPrice, setCartItems, cart, navigate } = useContext(AppContext)
  const [selectShipping, setSelectShipping] = useState(0)
  const { loadingGenerateOrder, generateOrderData, successGenerateOrder } = useSelector((state) => state.geterateOrder)

  useEffect(() => {
    let timeOut
    if (cart.length < 1) {
      timeOut = setTimeout(() => {
        navigate('/')
      }, 300)
    }
    return () => clearTimeout(timeOut)
  }, [cart, navigate])
  useEffect(() => {
    let timeOut
    if (successGenerateOrder) {
      timeOut = setTimeout(() => {
        navigate('/my-orders')
        setCartItems([])
        dispatch({ type: ORDER_GENERATE_RESET })
      }, 500)
    }
    return () => clearTimeout(timeOut)
  }, [successGenerateOrder, generateOrderData, dispatch, navigate, setCartItems])

  const handleOrder = (e) => {
    e.preventDefault()
    const data = {
      products: cart.map((item) => ({
        _id: item._id,
        price: item.publicPrice,
        title: item.title,
        quantity: item.quantity,
        supplierName: item.supplierName,
      })),
      addressIdOrder: selectShipping,
      shippingPrice,
    }
    dispatch(generateOrder(data))
  }

  return (
    <Page title='Resumen de Orden'>
      <Grid container component='form' direction='row' pb={5} mb={5}>
        <Grid item xs={12} md={8} className={classes.orderResumeScreenTitleContainer}>
          <h2>Resumen de orden</h2>
        </Grid>
        <Grid item xs={12} md={8} className={classes.orderResumeScreenContainer}>
          <ShippingSelect selectShipping={selectShipping} setSelectShipping={setSelectShipping} />
        </Grid>
        <Grid item xs={12} md={4} className={classes.orderResumeScreenContainer}>
          <OrderResume />
        </Grid>
        <Grid item xs={12} className={classes.orderResumeScreenButtonContainer}>
          <Button
            variant='outlined'
            color='secondary'
            disabled={loadingGenerateOrder}
            className={classes.orderResumeScreenBackToCartButton}
            onClick={() => navigate('/cart')}
          >
            Volver al Carrito
          </Button>

          <OrderConfirmationModal handleOrder={handleOrder} />
        </Grid>
      </Grid>
    </Page>
  )
}

export default OrderResumeScreen

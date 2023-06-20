import { useContext } from 'react'
import { makeStyles } from '@mui/styles'
import { Card, CardContent, Divider, Typography } from '@mui/material'
import {
  formatCurrencyToNum,
  formatNumToCurrency,
  intermediateCurrency,
} from '../../../shared/helpers/commonsFunctions'
import { AppContext } from '../../../contexts/AppContext'
import styles from '../styles/orderResumeStyles'

const useStyles = makeStyles(styles)

const OrderResume = () => {
  const classes = useStyles()
  const { shippingPrice, totalPrice, cart } = useContext(AppContext)

  return (
    <Card>
      <CardContent>
        <Typography>Tu Orden</Typography>
        <ul style={{ listStyle: 'none' }}>
          {cart.map((item) => (
            <li key={item._id} className={classes.orderResumeFirstItem}>
              <span>
                {item.quantity} x {item.title}
              </span>
              <span>{intermediateCurrency(item.publicPrice.toString())} </span>
            </li>
          ))}
          <li className={classes.orderResumeDivider}>
            <Divider />
          </li>
          <li className={classes.orderResumeText}>
            <span>Subtotal</span> <span>{intermediateCurrency(totalPrice().toString())}</span>
          </li>
          <li className={classes.orderResumeText}>
            <span>Envío</span> <span>{shippingPrice === 0 ? '-' : formatNumToCurrency(shippingPrice)}</span>
          </li>
          <li className={classes.orderResumeText}>
            <span>Impuesto</span> <span>-</span>
          </li>
          <li className={classes.orderResumeText}>
            <span>Descuento</span> <span>-</span>
          </li>
          <li className={classes.orderResumeDivider}>
            <Divider />
          </li>
          <li className={classes.orderResumeText}>
            <span>Total</span>{' '}
            <span>{intermediateCurrency(formatCurrencyToNum(shippingPrice.toString()) + Number(totalPrice()))}</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

export default OrderResume

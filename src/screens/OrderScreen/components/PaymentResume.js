import { Box } from '@mui/system'
import { makeStyles } from '@mui/styles'
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
// import myOrderResumeStyles from '../styles/myOrderResumeStyles'
import { LocalShipping } from '@mui/icons-material'
import { swichPaymentLinkStatus } from '../../../shared/helpers/commonsFunctions'

// const useStyles = makeStyles(myOrderResumeStyles)

const PaymentResume = ({ getOrderByAdminData }) => {
  console.log(getOrderByAdminData)
  const classes = {}
  return (
    <Card style={{ marginTop: '3rem' }}>
      <CardHeader
        style={{ backgroundColor: '#e6e5e5' }}
        title={
          <Box
            sx={{
              display: { sm: 'block', md: 'flex' },
              justifyContent: { md: 'space-between' },
              alignItems: 'center',
            }}
          >
            <Typography variant='h4'>Informacion del pago </Typography>
          </Box>
        }
      />
      <CardContent>
        <Typography variant='body1'>ID de pago {getOrderByAdminData.payment.paymentId}</Typography>
        <Typography variant='body1'>
          Detalle del pago {swichPaymentLinkStatus(getOrderByAdminData.payment.status)}
        </Typography>
        <Typography variant='body1'>Metodo de pago {getOrderByAdminData.payment.payment_method_id}</Typography>
        <ul style={{ paddingLeft: '0px' }}>
          <li style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <span style={{ fontWeight: '600' }}>
              <Typography variant='body1' color='GrayText'>
                Precio de productos
              </Typography>
            </span>
            <span>
              <span>$ {getOrderByAdminData.payment.productsPrice}</span>
            </span>
          </li>
          <li style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <span style={{ fontWeight: '600' }}>
              <Typography variant='body1' color='GrayText'>
                Precio de envio
              </Typography>
            </span>
            <span>
              <span>$ {getOrderByAdminData.payment.shippingPrice}</span>
            </span>
          </li>
          {getOrderByAdminData.payment.fee_details.map((item) => (
            <li style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }} key={item._id}>
              <span style={{ fontWeight: '600' }}>
                <Typography variant='body1' color='GrayText'>
                  Descuentos de Mp
                </Typography>
              </span>
              <span>
                <span>$ {item.amount}</span>
              </span>
            </li>
          ))}
          <li style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <span style={{ fontWeight: '600' }}>
              <Typography variant='body1' color='GrayText'>
                Neto recibido
              </Typography>
            </span>
            <span>
              <span>$ {getOrderByAdminData.payment.net_received_amount}</span>
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

export default PaymentResume

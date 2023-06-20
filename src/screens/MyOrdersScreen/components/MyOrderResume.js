import { Box } from '@mui/system'
import { makeStyles } from '@mui/styles'
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import myOrderResumeStyles from '../styles/myOrderResumeStyles'
import { LocalShipping } from '@mui/icons-material'

const useStyles = makeStyles(myOrderResumeStyles)

const MyOrderResume = ({ getOrderByAdminData }) => {
  const classes = useStyles()
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
            <Typography>Orden ID: {getOrderByAdminData._id}</Typography>
          </Box>
        }
      />
      <CardContent>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          {getOrderByAdminData.products.map((item) => (
            <li key={item._id} className={classes.orderResumeFirstItem}>
              <div style={{ display: 'flex' }}>
                {/* <Avatar alt={item.title} variant='square' src={`${item.image}`} sx={{ width: 50, height: 50 }} /> */}
                <div style={{ margin: '-3px 0 0 8px' }}>
                  <span style={{ fontWeight: '600' }}>
                    <Typography variant='body1' color='GrayText'>
                      {item.title}
                    </Typography>
                  </span>
                  <span>
                    {item.quantity} x $ {item.publicPrice} c/u
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'end' }}>
                <span>$ {item.quantity * item.publicPrice}</span>
              </div>
            </li>
          ))}
        </ul>
        {getOrderByAdminData.address && (
          <div className={classes.orderResumeFirstItem}>
            <div style={{ display: 'flex', alignItems: 'start', marginLeft: '10px' }}>
              <Typography variant='body1' color='GrayText' fontSize='20px'>
                Envio
              </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'end' }}>
              <span>$ {getOrderByAdminData.address.shippingPrice}</span>
            </div>
          </div>
        )}
        <Divider variant='middle' />
        <Typography variant='h6' style={{ textAlign: 'end', marginTop: '2rem' }}>
          Total{' '}
          <b>
            ${' '}
            {
              [
                ...getOrderByAdminData.products,
                {
                  publicPrice: Number(
                    parseFloat(getOrderByAdminData.address.shippingPrice).toString().replace('.', '')
                  ),
                  quantity: 1,
                },
              ]
                .map((item) => item.publicPrice * item.quantity)
                .reduce((previousValue, currentValue) => previousValue + currentValue, 0)}
          </b>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default MyOrderResume

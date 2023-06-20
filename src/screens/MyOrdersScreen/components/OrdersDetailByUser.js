import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import OrderStepper from '../../../components/OrderStepper/OrderStepper'
import MyOrderResume from './MyOrderResume'
import Loader from '../../../components/Loader/Loader'
import ColDownTimer from '../../../components/CoulDownTimer/CoulDownTimer'
import { getMyOrder } from '../../../redux/actions/myOrderActions'
import { isAfter } from 'date-fns'

const OrderDetailByUser = () => {
  const dispatch = useDispatch()

  const [searchParams] = useSearchParams()

  const orderById = searchParams.get('orderId')

  const { myOrderData, loadingMyOrder } = useSelector((state) => state.myOrder)

  useEffect(() => {
    dispatch(getMyOrder(orderById))
  }, [dispatch, orderById])

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', alignItems: 'center' }}>
        <h4 style={{ fontSize: '1.5rem' }}>Detalle de Orden</h4>
      </div>
      {loadingMyOrder ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10rem', alignItems: 'center' }}>
          <Loader />
        </div>
      ) : (
        myOrderData && (
          <>
            {myOrderData ? (
              <Grid container columnSpacing={4}>
                <Grid item xs={12} md={12} mt={5}>
                  <OrderStepper getOrderByAdminData={myOrderData} />

                  <MyOrderResume getOrderByAdminData={myOrderData} />
                   {myOrderData?.payment?.expirationDate && ( <Card style={{ marginTop: '16px' }}>
                    <CardHeader style={{ backgroundColor: '#e6e5e5' }} title={<Typography>Link de pago</Typography>} />
                  
                      <>
                        <CardContent>
                          <ColDownTimer targetDate={myOrderData.payment.expirationDate} />
                        </CardContent>
                        <CardActions>
                          <Grid container>
                            <Grid item xs={12}>
                              <Button
                                color='primary'
                                variant='contained'
                                fullWidth
                                disabled={!isAfter(new Date(myOrderData.payment.expirationDate), new Date())}
                                onClick={() => {
                                  window.location.href = myOrderData.payment.paymentLink
                                }}
                              >
                                Pagar
                              </Button>
                            </Grid>
                          </Grid>
                        </CardActions>
                      </>
                  
                  </Card>  )}
                </Grid>{' '}
              </Grid>
            ) : (
              <>no se ah realizado el pago aun</>
            )}
          </>
        )
      )}
    </>
  )
}

export default OrderDetailByUser

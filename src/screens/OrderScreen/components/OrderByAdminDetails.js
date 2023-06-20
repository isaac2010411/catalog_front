import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import OrderStepper from '../../../components/OrderStepper/OrderStepper'
import Loader from '../../../components/Loader/Loader'
import MyOrderResume from '../../MyOrdersScreen/components/MyOrderResume'
import { getOrderByAdmin } from '../../../redux/actions/orderActions'
import UpdateOrderModal from './UpdateOrderModal'

const OrderByAdminDetails = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const orderById = searchParams.get('orderId')
  const [data, setData] = useState()

  const { getOrderByAdminData, loadingGetOrderByAdmin } = useSelector((state) => state.getOrderByAdmin)
  const { updateOrderData } = useSelector((state) => state.updateOrder)

  useEffect(() => {
    dispatch(getOrderByAdmin(orderById))
  }, [dispatch, orderById])

  useEffect(() => {
    if (getOrderByAdminData) {
      setData(getOrderByAdminData)
    }
  }, [getOrderByAdminData])

  useEffect(() => {
    if (updateOrderData) {
      setData((prev) => ({ ...prev, status: updateOrderData.status }))
    }
  }, [updateOrderData])

  return (
    <>
      {loadingGetOrderByAdmin ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15rem' }}>
          <Loader />
        </div>
      ) : (
        data && (
          <Grid container spacing={4}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '40px',
                alignItems: 'center',
              }}
            >
              <h4 style={{ fontSize: '1.5rem' }}>Detalle de Orden</h4>
            </div>
            <Grid item xs={12}>
              <Card>
                <CardHeader style={{ backgroundColor: '#e6e5e5' }} title={<Typography>Estado de orden</Typography>} />
                <CardContent>
                  <OrderStepper getOrderByAdminData={data} />
                </CardContent>
                <CardActions>
                  <Grid container>
                    <Grid item xs={12}>
                      <UpdateOrderModal orderState={data} setOrderState={console.log} />
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <MyOrderResume getOrderByAdminData={data} />
            </Grid>
          </Grid>
        )
      )}
    </>
  )
}

export default OrderByAdminDetails

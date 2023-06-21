import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { Button, Card, CardContent, Chip, Grid, IconButton } from '@mui/material'
import { Add, ArrowForward } from '@mui/icons-material'
import Loader from '../../../components/Loader/Loader'
import ItemNotFound from '../../../components/ItemNotFound/ItemNotFound'
import styles from '../styles/ordersByUserTableStyles'
import { makeStyles } from '@mui/styles'
import { getMyOrders } from '../../../redux/actions/myOrderActions'

const useStyles = makeStyles(styles)

const OrdersByUserTable = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { myOrdersData, loadingMyOrders } = useSelector((state) => state.myOrders)

  useEffect(() => {
    dispatch(getMyOrders())
  }, [dispatch])

  console.log(myOrdersData)
  return (
    <Grid container>
      <Grid item xs={12} className={classes.ordersByUserTableContainer}>
        <h4 style={{ fontSize: '1.5rem' }}>Mis Ordenes</h4>
        <Button variant='contained' color='secondary' startIcon={<Add />} onClick={() => navigate('/')}>
          Nueva Orden
        </Button>
      </Grid>
      {loadingMyOrders ? (
        <Grid item xs={12} className={classes.loader}>
          <Loader />
        </Grid>
      ) : myOrdersData && myOrdersData.length < 1 ? (
        <ItemNotFound text={'No se encontraron ordenes, para hacer una presione Nueva Orden'} />
      ) : (
        <>
          <Grid item xs={12}>
            <Grid container sx={{ display: { xs: 'none', md: 'flex' }, p: 2 }}>
              <Grid item xs={12} sm={6} md={3} className={classes.ordersByUserTableHeaders}>
                # Orden
              </Grid>
              <Grid item xs={12} sm={6} md={2} className={classes.ordersByUserTableHeaders}>
                Pago
              </Grid>

              <Grid item xs={12} sm={6} md={3} className={classes.ordersByUserTableHeaders}>
                Fecha de compra
              </Grid>
              <Grid item xs={12} sm={6} md={3} className={classes.ordersByUserTableHeaders}>
                Total
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {myOrdersData &&
              myOrdersData.map((item) => (
                <Card
                  key={item._id}
                  className={classes.ordersByUserTableCard}
                  onClick={() => navigate(`/my-orders?orderId=${item._id}`)}
                >
                  <CardContent>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={3}>
                        <h5 className={classes.ordersByUserTableHeaders}>{`${item._id.slice(0, 8)}`}</h5>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2} className={classes.ordersByUserTablePrice}>
                        <Chip
                          label={
                            item?.payments?.status === 'paid'
                              ? 'Pago'
                              : item?.payments?.status === 'rejected'
                              ? 'Rechazado'
                              : item?.payments?.paymentLink
                              ? 'Link generado'
                              : 'Pendiente'
                          }
                          variant='filled'
                          color={  item?.payments?.status === 'paid'
                          ? 'success'
                          : item?.payments?.status === 'rejected'
                          ? 'error':item?.payments?.paymentLink ? 'warning' : 'error'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} className={classes.ordersByUserTablePrice}>
                        <p className={classes.ordersByUserTableBody}>{format(new Date(item.created), 'dd/MM/yyyy')}</p>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3} className={classes.ordersByUserTablePrice}>
                        <p className={classes.ordersByUserTableBody}>
                          ${' '}
                          {[
                            ...item.products,
                            {
                              publicPrice: Number(parseFloat(item.address.shippingPrice).toString().replace('.', '')),
                              quantity: 1,
                            },
                          ]
                            .map((p) => p.publicPrice)
                            .reduce(
                              (previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue),
                              0
                            )
                            .toFixed(2)}
                        </p>
                      </Grid>
                      <Grid item xs={12} md={1} className={classes.ordersByUserTableArrow}>
                        <IconButton>
                          <ArrowForward
                            style={{
                              color: 'rgb(125, 135, 156)',
                            }}
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default OrdersByUserTable

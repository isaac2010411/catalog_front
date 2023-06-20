import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { format } from 'date-fns'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Money, Visibility } from '@mui/icons-material'
import { Button, Card, IconButton } from '@mui/material'
import ReactTable from '../../components/CustomReactTable/CustomReactTable'
import { getOrdersByAdmin } from '../../redux/actions/orderActions'
import CustomPageTable from '../../components/CustomPageTable/CustomPageTable'
import OrderByAdminDetails from './components/OrderByAdminDetails'
import Loader from '../../components/Loader/Loader'
import TimelapseIcon from '@mui/icons-material/Timelapse'
import Checkbox from '@mui/material/Checkbox'
import GeneratePaymentLinkModal from './components/GeneratePaymentLinkModal'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const OrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const orderById = searchParams.get('orderId')

  const [data, setData] = useState([])

  const { userInfo } = useSelector((state) => state.userLogin)
  const { getOrdersByAdminData, loadingGetOrdersByAdmin } = useSelector((state) => state.getOrdersByAdmin)

  useEffect(() => {
    if (!orderById) {
      dispatch(getOrdersByAdmin())
    }
  }, [dispatch, orderById])

  useEffect(() => {
    if (getOrdersByAdminData) {
      const ordersData = getOrdersByAdminData.map((item) => {
        return {
          id: item._id,
          created: format(new Date(item.created), 'dd/MM/yyyy'),
          userName: item.user.name,
          amount: `$ ${[
            ...item.products,
            {
              publicPrice: Number(parseFloat(item.address.shippingPrice).toString().replace('.', '')),
              quantity: 1,
            },
          ]
            .map((p) => p.publicPrice * p.quantity)
            .reduce((previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue), 0)
            .toFixed(2)}`,
          owner: item.owner?.name || '',
          billings: `$ ${
            item.products
              .map((p) => p.publicPrice)
              .reduce((previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue), 0) * 0.3
          }`,
          actions: (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {/* {!item.payment ? ( */}
                <GeneratePaymentLinkModal item={item} />
              // ) : (
              //   <IconButton>
              //     <TimelapseIcon />
              //   </IconButton>
              // )}

              <IconButton onClick={() => navigate(`/orders?orderId=${item._id}`)}>
                <Visibility />
              </IconButton>
            </div>
          ),
        }
      })
      setData(ordersData)
    }
  }, [getOrdersByAdminData, navigate])

  const columns = () => {
    const headersTable = [
      {
        Header: 'Fecha',
        accessor: 'created',
      },
    ]
    if (userInfo && userInfo.role === 'superadministrator') {
      headersTable.push({
        Header: 'Importe',
        accessor: 'amount',
      })
      headersTable.push({
        Header: 'Pago',
        accessor: 'c',
        Cell: (prop) => <div>Recibido</div>,
        // Cell: (prop) => <div style={{ textAlign: 'end' }}>{prop.row.original.actions}</div>,
      })
      headersTable.push({
        Header: 'estado',
        accessor: 'cobrar',
        Cell: (prop) => <div>Concretado</div>,
      })
      headersTable.push({
        Header: '',
        accessor: 'actions',
        Cell: (prop) => <div style={{ textAlign: 'end' }}>{prop.row.original.actions}</div>,
      })
    } else {
      headersTable.push(
        {
          Header: 'Ganancia',
          accessor: 'billings',
        },
        {
          Header: 'Liquidar',
          accessor: 'cobrar',
          Cell: (prop) => (
            <div>
              <Checkbox color='secondary' {...label} defaultChecked />
            </div>
          ),
        }
      )
      headersTable.push({
        Header: '',
        accessor: 'actions',
        Cell: (prop) => <div style={{ textAlign: 'end' }}>{prop.row.original.actions}</div>,
      })
    }

    return headersTable
  }

  return (
    <CustomPageTable pageName='Ordenes'>
      {loadingGetOrdersByAdmin ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15rem' }}>
          <Loader />
        </div>
      ) : orderById ? (
        <OrderByAdminDetails />
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '40px',
              alignItems: 'center',
            }}
          >
            <h4 style={{ fontSize: '1.5rem' }}>Ordenes</h4>
            {userInfo && userInfo.role === 'administrator' && (
              <Button startIcon={<Money />} variant='contained' color='secondary'>
                Solicitar liquidacion
              </Button>
            )}
          </div>
          {loadingGetOrdersByAdmin ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Loader />
            </div>
          ) : (
            <Card>
              <ReactTable columns={columns()} data={data} />
            </Card>
          )}
        </>
      )}
    </CustomPageTable>
  )
}

export default OrderScreen

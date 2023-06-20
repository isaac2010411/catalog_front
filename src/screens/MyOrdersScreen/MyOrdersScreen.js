import { useSearchParams } from 'react-router-dom'
import OrderDetailsByUser from './components/OrdersDetailByUser'
import OrdersByUserTable from './components/OrdersByUserTable'
import MyOrderPaymentResult from './components/MyOrderPaymentResult'
import CustomPageTable from '../../components/CustomPageTable/CustomPageTable'

const MyOrdersScreen = () => {
  const [searchParams] = useSearchParams()
  const orderById = searchParams.get('orderId')
  const collectionId = searchParams.get('collection_id')

  return (
    <CustomPageTable pageName='Mis Ordenes'>
      {orderById ? <OrderDetailsByUser /> : collectionId ? <MyOrderPaymentResult /> : <OrdersByUserTable />}
    </CustomPageTable>
  )
}

export default MyOrdersScreen

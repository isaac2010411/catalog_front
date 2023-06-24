import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import AuthRoutes from './authRoutes'
import PublicRoutes from './publicRoutes'
import AdminRoutes from './adminRoutes'
import SuperRoutes from './superRoutes'
import LoginScreen from '../screens/LoginScreen/LoginScreen'
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen'
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen'
import UsersScreen from '../screens/UsersScreen/UsersScreen'
import SupplierScreen from '../screens/SupplierScreen/SupplierScreen'
import SupplierProducstScreen from '../screens/ProductScreen/ProductScreen'
import CartScreen from '../screens/CartScreen/CartScreen'
import MyAddressScreen from '../screens/MyAddressScreen/MyAddressScreen'
import OrderResumeScreen from '../screens/OrderResumeScreen/OrderResumeScreen'
import MyOrdersScreen from '../screens/MyOrdersScreen/MyOrdersScreen'
import OrderScreen from '../screens/OrderScreen/OrderScreen'
import NotificationScreen from '../screens/NotificationScreen/NotificationScreen'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          path='/'
          element={
            <AuthRoutes>
              <SupplierProducstScreen />
            </AuthRoutes>
          }
        ></Route>
        <Route
          path='/suppliers'
          element={
            <SuperRoutes>
              <SupplierScreen />
            </SuperRoutes>
          }
        ></Route>
        <Route
          path='/profile'
          element={
            <AuthRoutes>
              <ProfileScreen />
            </AuthRoutes>
          }
        />
        <Route
          path='/cart'
          element={
            <AuthRoutes>
              <CartScreen />
            </AuthRoutes>
          }
        />
        <Route
          path='/order-resume'
          element={
            <AuthRoutes>
              <OrderResumeScreen />
            </AuthRoutes>
          }
        />
        <Route
          path='/orders'
          element={
            <AuthRoutes>
              <OrderScreen />
            </AuthRoutes>
          }
        />
          <Route
          path='/notifications'
          element={
            <AuthRoutes>
              <NotificationScreen />
            </AuthRoutes>
          }
        />
        <Route
          path='/my-orders'
          element={
            <AuthRoutes>
              <MyOrdersScreen />
            </AuthRoutes>
          }
        />

        <Route
          path='/users'
          element={
            <AdminRoutes>
              <UsersScreen />
            </AdminRoutes>
          }
        />
        <Route
          path='/my-addresses'
          element={
            <AuthRoutes>
              <MyAddressScreen />
            </AuthRoutes>
          }
        />
        <Route
          path='/sign-in'
          element={
            <PublicRoutes>
              <LoginScreen />
            </PublicRoutes>
          }
        />
        <Route
          path='/sign-up'
          element={
            <PublicRoutes>
              <SignUpScreen />
            </PublicRoutes>
          }
        />
      </Route>
    </Routes>
  )
}

export default App

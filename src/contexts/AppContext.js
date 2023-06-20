import { createContext, useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAllProducts } from '../redux/actions/productActions'
import { SocketContext } from './socketContext'

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const { socket, online } = useContext(SocketContext)

  const [drawerState, setDrawerState] = useState(false)
  const [shippingPrice, setShippingPrice] = useState(0)
  const toggleDrawerState = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setDrawerState(open)
  }
  //finish Sidebar menu toggle
  const { userInfo } = useSelector((state) => state.userLogin)
  const { loadingProductGetAll, productGetAllData, successProductGetAll } = useSelector((state) => state.productGetAll)

  useEffect(() => {
    if (location.pathname === '/' && !productGetAllData) {
      // dispatch(getAllProducts())
    }
  }, [dispatch, location, productGetAllData])

  useEffect(() => {
    if (userInfo && !online) {
      let ownUser = {
        _id: userInfo._id,
        name: userInfo?.name || 'User',
        role: userInfo?.role || 'no-loggued',
        isAdmin: userInfo?.isAdmin || false,
        isSuper: userInfo?.isSuper || false,
      }

      socket.emit('user-connected', ownUser)
    }
  }, [online, socket, userInfo])

  const handleProducts = (categoryId) => {
    dispatch(getAllProducts(categoryId))
  }

  //start cart context
  const [cart, setCartItems] = useState([])

  const addQuantity = (item) => {
    const data = cart.map((obj) => {
      if (obj._id === item._id && obj.quantity <= item.available - 1) {
        obj.quantity = Number(obj.quantity) + 1
      }
      return obj
    })
    setCartItems(data)
  }

  const substractQuantity = (item) => {
    const data = cart.map((obj) => {
      if (obj._id === item._id) {
        obj.quantity = Number(obj.quantity) - 1
      }
      return obj
    })
    setCartItems(data)
  }

  const totalPrice = () => {
    let totalAmount = cart
      .map((item) => item.publicPrice * item.quantity)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
      .toFixed(2)

    return totalAmount
  }

  const totalQuantity = () => {
    let totalAmount = cart
      .map((item) => item.quantity)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0)

    return totalAmount
  }

  const addToCart = (item) => {
    const isItemInCart = cart.map((obj) => ({ _id: obj._id })).find((ca) => ca._id === item._id)
    if (isItemInCart) {
      addQuantity(item)
    } else {
      setCartItems((prev) => [item, ...prev])
    }
  }
  const quitToCart = (item) => {
    const isItemInCart = cart.map((obj) => ({ _id: obj._id })).find((ca) => ca._id === item._id)
    const data = cart.filter((c) => c._id !== isItemInCart._id)
    setCartItems(data)
  }
  const substractToCart = (item) => {
    const isItemInCart = cart.map((obj) => ({ _id: obj._id })).find((ca) => ca._id === item._id)
    if (isItemInCart.quantity === 1) {
      const data = cart.filter((c) => c._id !== isItemInCart._id)
      setCartItems(data)
    } else {
      substractQuantity(item)
    }
  }
  // finish  cart context

  return (
    <AppContext.Provider
      value={{
        drawerState,
        setDrawerState,
        navigate,
        toggleDrawerState,

        cart,
        setCartItems,
        addToCart,
        totalPrice,
        totalQuantity,
        substractToCart,
        quitToCart,

        productGetAllData,
        loadingProductGetAll,
        successProductGetAll,
        handleProducts,
        shippingPrice,
        setShippingPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

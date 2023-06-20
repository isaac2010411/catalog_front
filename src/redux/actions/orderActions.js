import axios from 'axios'
import * as constants from '../constants/ordersConstants'

export const generatePaymentLink = (orderData) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.ORDER_GENERATE_PAYMENT_LINK_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/payments/link', orderData, config)

    dispatch({ type: constants.ORDER_GENERATE_PAYMENT_LINK_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.ORDER_GENERATE_PAYMENT_LINK_FAIL,
      payload: {
        message: error.response && error.response.data ? error.response.data : 'error.message',
        status: error.response && error.response.status,
      },
    })
  }
}

export const generateOrder = (orderData) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.ORDER_GENERATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/payments', orderData, config)

    dispatch({ type: constants.ORDER_GENERATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.ORDER_GENERATE_FAIL,
      payload: {
        message: error.response && error.response.data ? error.response.data : 'error.message',
        status: error.response && error.response.status,
      },
    })
  }
}

export const getOrdersByAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.ORDER_GET_LIST_BY_ADMIN_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/orders', config)

    dispatch({ type: constants.ORDER_GET_LIST_BY_ADMIN_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.ORDER_GET_LIST_BY_ADMIN_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}

export const getOrderByAdmin = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.ORDER_GET_BY_ADMIN_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${orderId}`, config)

    dispatch({ type: constants.ORDER_GET_BY_ADMIN_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.ORDER_GET_BY_ADMIN_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}

export const getOrdersByUserId = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.ORDER_GET_LIST_BY_USER_ID_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/users/${userId}`, config)

    dispatch({ type: constants.ORDER_GET_LIST_BY_USER_ID_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.ORDER_GET_LIST_BY_USER_ID_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}

export const updateOrder = (orderData) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.ORDER_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/orders/order-status/${orderData._id}`, orderData, config)

    dispatch({ type: constants.ORDER_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.ORDER_UPDATE_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}

import axios from 'axios'
import * as constants from '../constants/myOrderConstants'

export const getMyOrders = () => async (dispatch, getState) => {
    try {
      dispatch({ type: constants.MY_ORDER_LIST_REQUEST })
  
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
  
      const { data } = await axios.get(`/api/my-orders`, config)
  
      dispatch({ type: constants.MY_ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: constants.MY_ORDER_LIST_FAIL,
        payload: {
          message: error.response && error.response.data.message ? error.response.data.message : error.message,
          status: error.response && error.response.status,
        },
      })
    }
  }
  
  export const getMyOrder= (orderId) => async (dispatch, getState) => {
    try {
      dispatch({ type: constants.MY_ORDER_REQUEST })
  
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
  
      const { data } = await axios.get(`/api/my-orders/${orderId}`, config)
  
      dispatch({ type: constants.MY_ORDER_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: constants.MY_ORDER_FAIL,
        payload: {
          message: error.response && error.response.data.message ? error.response.data.message : error.message,
          status: error.response && error.response.status,
        },
      })
    }
  }
  
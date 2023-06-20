import axios from 'axios'
import * as constants from '../constants/stockConstants'

export const getAllStock = () => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.STOCK_GET_ALL_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/stock`, config)

    dispatch({ type: constants.STOCK_GET_ALL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.STOCK_GET_ALL_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}

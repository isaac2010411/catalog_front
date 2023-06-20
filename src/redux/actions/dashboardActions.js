import axios from 'axios'
import { format } from 'date-fns'
import * as constants from '../constants/dashboardConstants'

export const getDashboardData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.DASHBOARD_GET_ALL_DATA_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const date = format(new Date(), 'yyyy-MM-dd')
    const { data } = await axios.get(`/api/dashboard?date=${date}`, config)

    dispatch({ type: constants.DASHBOARD_GET_ALL_DATA_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.DASHBOARD_GET_ALL_DATA_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}

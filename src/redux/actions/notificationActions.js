import axios from 'axios'
import * as constants from '../constants/notificationConstants'

export const getNotificationList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.NOTIFICATION_LIST_REQUEST })

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

    const { data } = await axios.get(`/api/notifications`, config)

    dispatch({ type: constants.NOTIFICATION_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.NOTIFICATION_LIST_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}

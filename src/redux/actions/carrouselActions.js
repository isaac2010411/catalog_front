import axios from 'axios'
import * as constants from '../constants/carrouselConstants'

export const registerCarrouselData = (carrouselData) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.CARROUSEL_REGISTER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    let formData = new FormData()

    for (let key in carrouselData) {
      formData.append(key, carrouselData[key])
    }

    const { data } = await axios.post('/api/carrousel', formData, config)

    dispatch({ type: constants.CARROUSEL_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.CARROUSEL_REGISTER_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}
export const getCarrouselList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.CARROUSEL_GET_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/carrousel', config)

    dispatch({ type: constants.CARROUSEL_GET_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.CARROUSEL_GET_LIST_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}

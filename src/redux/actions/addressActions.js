import axios from 'axios'
import * as constants from '../constants/addressConstants'

export const registerAddress = (addressData) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.ADDRESS_REGISTER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/addresses', addressData, config)

    dispatch({ type: constants.ADDRESS_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.ADDRESS_REGISTER_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}
export const getAddressByUserId = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.ADDRESS_GET_LIST_BY_USER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/addresses/users/${userId}`, config)

    dispatch({ type: constants.ADDRESS_GET_LIST_BY_USER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.ADDRESS_GET_LIST_BY_USER_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}
export const updateAddress = (addressData) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.ADDRESS_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/addresses/${addressData._id}`, addressData, config)

    dispatch({ type: constants.ADDRESS_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.ADDRESS_UPDATE_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}
export const deleteAddress = (addressData) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.ADDRESS_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.delete(`/api/addresses/${addressData._id}`, config)

    dispatch({ type: constants.ADDRESS_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.ADDRESS_DELETE_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}
export const updateAddressCoordinates = (addressData) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.ADDRESS_UPDATE_COORDINATES_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/addresses/${addressData._id}/coordinates`, addressData, config)

    dispatch({ type: constants.ADDRESS_UPDATE_COORDINATES_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.ADDRESS_UPDATE_COORDINATES_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}

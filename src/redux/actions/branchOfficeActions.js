import axios from 'axios'
import * as constants from '../constants/branchOfficeConstants'

export const registerBranchOffice = (addressData) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.BRANCH_OFFICE_REGISTER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/branch-address', addressData, config)

    dispatch({ type: constants.BRANCH_OFFICE_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.BRANCH_OFFICE_REGISTER_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}

export const registerBranchOfficeCoordinates = (coordinates) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.BRANCH_OFFICE_REGISTER_COORDINATES_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/branch-office/coordinates', coordinates, config)

    dispatch({ type: constants.BRANCH_OFFICE_REGISTER_COORDINATES_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.BRANCH_OFFICE_REGISTER_COORDINATES_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}

export const getBranchOffice = () => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.BRANCH_OFFICE_GET_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/branch-office', config)

    dispatch({ type: constants.BRANCH_OFFICE_GET_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.BRANCH_OFFICE_GET_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}

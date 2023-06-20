import axios from 'axios'
import * as constants from '../constants/locationConstants'

export const getLocationByCp = (cp) => async (dispatch) => {
  try {
    dispatch({ type: constants.LOCATION_BY_CP_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`https://apis.andreani.com/v1/localidades?codigosPostales=${cp}`, config)

    dispatch({ type: constants.LOCATION_BY_CP_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.LOCATION_BY_CP_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}

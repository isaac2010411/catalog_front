import * as constants from '../constants/locationConstants'

export const locationByCPReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.LOCATION_BY_CP_REQUEST:
      return { loadingLocationByCp: true }
    case constants.LOCATION_BY_CP_SUCCESS:
      return {
        loadingLocationByCp: false,
        successLocationByCp: true,
        locationByCpData: action.payload,
      }
    case constants.LOCATION_BY_CP_FAIL:
      return {
        loadingLocationByCp: false,
        errorLocationByCp: action.payload,
      }
    case constants.LOCATION_BY_CP_RESET:
      return {}
    default:
      return state
  }
}

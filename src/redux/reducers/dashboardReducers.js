import * as constants from '../constants/dashboardConstants'

export const dashboardGetDataReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.DASHBOARD_GET_ALL_DATA_REQUEST:
      return { loadingdashboardGetData: true }
    case constants.DASHBOARD_GET_ALL_DATA_SUCCESS:
      return {
        loadingdashboardGetData: false,
        successdashboardGetData: true,
        dashboardGetData: action.payload,
      }
    case constants.DASHBOARD_GET_ALL_DATA_FAIL:
      return {
        loadingdashboardGetData: false,
        errordashboardGetData: action.payload,
      }
    case constants.DASHBOARD_GET_ALL_DATA_RESET:
      return {}
    default:
      return state
  }
}

import * as constants from '../constants/stockConstants'

export const stockGetAllReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.STOCK_GET_ALL_REQUEST:
      return { loadingstockGetAll: true }
    case constants.STOCK_GET_ALL_SUCCESS:
      return {
        loadingstockGetAll: false,
        successstockGetAll: true,
        stockGetAllData: action.payload,
      }
    case constants.STOCK_GET_ALL_FAIL:
      return {
        loadingstockGetAll: false,
        errorstockGetAll: action.payload,
      }
    case constants.STOCK_GET_ALL_RESET:
      return {}
    default:
      return state
  }
}

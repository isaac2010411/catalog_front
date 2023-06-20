import * as constants from '../constants/myOrderConstants'

export const myOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.MY_ORDER_LIST_REQUEST:
      return { loadingMyOrders: true }
    case constants.MY_ORDER_LIST_SUCCESS:
      return {
        loadingMyOrders: false,
        successMyOrders: true,
        myOrdersData: action.payload,
      }
    case constants.MY_ORDER_LIST_FAIL:
      return {
        loadingMyOrders: false,
        errorMyOrders: action.payload,
      }
    case constants.MY_ORDER_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const myOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.MY_ORDER_REQUEST:
      return { loadingMyOrder: true }
    case constants.MY_ORDER_SUCCESS:
      return {
        loadingMyOrder: false,
        successMyOrder: true,
        myOrderData: action.payload,
      }
    case constants.MY_ORDER_FAIL:
      return {
        loadingMyOrder: false,
        errorMyOrder: action.payload,
      }
    case constants.MY_ORDER_RESET:
      return {}
    default:
      return state
  }
}

import * as constants from '../constants/ordersConstants'

export const geteratePaymentLinkReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.ORDER_GENERATE_PAYMENT_LINK_REQUEST:
      return { loadingGeneratePaymentLink: true }
    case constants.ORDER_GENERATE_PAYMENT_LINK_SUCCESS:
      return {
        loadingGeneratePaymentLink: false,
        successGeneratePaymentLink: true,
        generatePaymentLinkData: action.payload,
      }
    case constants.ORDER_GENERATE_PAYMENT_LINK_FAIL:
      return {
        loadingGeneratePaymentLink: false,
        errorGeneratePaymentLink: action.payload,
      }
    case constants.ORDER_GENERATE_PAYMENT_LINK_RESET:
      return {}
    default:
      return state
  }
}

export const geterateOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.ORDER_GENERATE_REQUEST:
      return { loadingGenerateOrder: true }
    case constants.ORDER_GENERATE_SUCCESS:
      return {
        loadingGenerateOrder: false,
        successGenerateOrder: true,
        generateOrderData: action.payload,
      }
    case constants.ORDER_GENERATE_FAIL:
      return {
        loadingGenerateOrder: false,
        errorGenerateOrder: action.payload,
      }
    case constants.ORDER_GENERATE_RESET:
      return {}
    default:
      return state
  }
}

export const getOrdersByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.ORDER_GET_LIST_BY_ADMIN_REQUEST:
      return { loadingGetOrdersByAdmin: true }
    case constants.ORDER_GET_LIST_BY_ADMIN_SUCCESS:
      return {
        loadingGetOrdersByAdmin: false,
        successGetOrdersByAdmin: true,
        getOrdersByAdminData: action.payload,
      }
    case constants.ORDER_GET_LIST_BY_ADMIN_FAIL:
      return {
        loadingGetOrdersByAdmin: false,
        errorGetOrdersByAdmin: action.payload,
      }
    case constants.ORDER_GET_LIST_BY_ADMIN_RESET:
      return {}
    default:
      return state
  }
}

export const getOrderByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.ORDER_GET_BY_ADMIN_REQUEST:
      return { loadingGetOrderByAdmin: true }
    case constants.ORDER_GET_BY_ADMIN_SUCCESS:
      return {
        loadingGetOrderByAdmin: false,
        successGetOrderByAdmin: true,
        getOrderByAdminData: action.payload,
      }
    case constants.ORDER_GET_BY_ADMIN_FAIL:
      return {
        loadingGetOrderByAdmin: false,
        errorGetOrderByAdmin: action.payload,
      }
    case constants.ORDER_GET_BY_ADMIN_RESET:
      return {}
    default:
      return state
  }
}

export const getOrdersByUserIdReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.ORDER_GET_LIST_BY_USER_ID_REQUEST:
      return { loadingGetOrdersByUserId: true }
    case constants.ORDER_GET_LIST_BY_USER_ID_SUCCESS:
      return {
        loadingGetOrdersByUserId: false,
        successGetOrdersByUserId: true,
        getOrdersByUserIdData: action.payload,
      }
    case constants.ORDER_GET_LIST_BY_USER_ID_FAIL:
      return {
        loadingGetOrdersByUserId: false,
        errorGetOrdersByUserId: action.payload,
      }
    case constants.ORDER_GET_LIST_BY_USER_ID_RESET:
      return {}
    default:
      return state
  }
}

export const updateOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.ORDER_UPDATE_REQUEST:
      return { loadingUpdateOrder: true }
    case constants.ORDER_UPDATE_SUCCESS:
      return {
        loadingUpdateOrder: false,
        successUpdateOrder: true,
        updateOrderData: action.payload,
      }
    case constants.ORDER_UPDATE_FAIL:
      return {
        loadingUpdateOrder: false,
        errorUpdateOrder: action.payload,
      }
    case constants.ORDER_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

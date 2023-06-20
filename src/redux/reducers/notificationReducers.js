import * as constants from '../constants/notificationConstants'

export const notificationListReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.NOTIFICATION_LIST_REQUEST:
      return { loadingNotificationList: true }
    case constants.NOTIFICATION_LIST_SUCCESS:
      return {
        loadingNotificationList: false,
        successNotificationList: true,
        notificationListData: action.payload,
      }
    case constants.NOTIFICATION_LIST_FAIL:
      return {
        loadingNotificationList: false,
        errorNotificationList: action.payload,
      }
    case constants.NOTIFICATION_LIST_RESET:
      return {}
    default:
      return state
  }
}

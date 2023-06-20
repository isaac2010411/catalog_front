import * as constants from '../constants/addressConstants'

export const addressRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.ADDRESS_REGISTER_REQUEST:
      return { loadingAddressRegister: true }
    case constants.ADDRESS_REGISTER_SUCCESS:
      return {
        loadingAddressRegister: false,
        successAddressRegister: true,
        addressRegisterData: action.payload,
      }
    case constants.ADDRESS_REGISTER_FAIL:
      return {
        loadingAddressRegister: false,
        errorAddressRegister: action.payload,
      }
    case constants.ADDRESS_REGISTER_RESET:
      return {}
    default:
      return state
  }
}
export const addressesByUserIdReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.ADDRESS_GET_LIST_BY_USER_REQUEST:
      return { loadingAddressesByUserId: true }
    case constants.ADDRESS_GET_LIST_BY_USER_SUCCESS:
      return {
        loadingAddressesByUserId: false,
        successAddressesByUserId: true,
        addressesByUserIdData: action.payload,
      }
    case constants.ADDRESS_GET_LIST_BY_USER_FAIL:
      return {
        loadingAddressesByUserId: false,
        errorAddressesByUserId: action.payload,
      }
    case constants.ADDRESS_GET_LIST_BY_USER_RESET:
      return {}
    default:
      return state
  }
}
export const addressUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.ADDRESS_UPDATE_REQUEST:
      return { loadingAddressUpdate: true }
    case constants.ADDRESS_UPDATE_SUCCESS:
      return {
        loadingAddressUpdate: false,
        successAddressUpdate: true,
        addressUpdateData: action.payload,
      }
    case constants.ADDRESS_UPDATE_FAIL:
      return {
        loadingAddressUpdate: false,
        errorAddressUpdate: action.payload,
      }
    case constants.ADDRESS_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
export const addressDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.ADDRESS_DELETE_REQUEST:
      return { loadingAddressDelete: true }
    case constants.ADDRESS_DELETE_SUCCESS:
      return {
        loadingAddressDelete: false,
        successAddressDelete: true,
        addressDeleteData: action.payload,
      }
    case constants.ADDRESS_DELETE_FAIL:
      return {
        loadingAddressDelete: false,
        errorAddressDelete: action.payload,
      }
    case constants.ADDRESS_DELETE_RESET:
      return {}
    default:
      return state
  }
}
export const addressUpdateCoordinatesReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.ADDRESS_UPDATE_COORDINATES_REQUEST:
      return { loadingAddressUpdateCoordinates: true }
    case constants.ADDRESS_UPDATE_COORDINATES_SUCCESS:
      return {
        loadingAddressUpdateCoordinates: false,
        successAddressUpdateCoordinates: true,
        addressUpdateCoordinatesData: action.payload,
      }
    case constants.ADDRESS_UPDATE_COORDINATES_FAIL:
      return {
        loadingAddressUpdateCoordinates: false,
        errorAddressUpdateCoordinates: action.payload,
      }
    case constants.ADDRESS_UPDATE_COORDINATES_RESET:
      return {}
    default:
      return state
  }
}

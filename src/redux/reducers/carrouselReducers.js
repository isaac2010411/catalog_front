import * as constants from '../constants/carrouselConstants'

export const carrouselRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.CARROUSEL_REGISTER_REQUEST:
      return { loadingCarrouselRegister: true }
    case constants.CARROUSEL_REGISTER_SUCCESS:
      return {
        loadingCarrouselRegister: false,
        successCarrouselRegister: true,
        carrouselRegisterData: action.payload,
      }
    case constants.CARROUSEL_REGISTER_FAIL:
      return {
        loadingCarrouselRegister: false,
        errorCarrouselRegister: action.payload,
      }
    case constants.CARROUSEL_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const carrouselListReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.CARROUSEL_GET_LIST_REQUEST:
      return { loadingCarrouselList: true }
    case constants.CARROUSEL_GET_LIST_SUCCESS:
      return {
        loadingCarrouselList: false,
        successCarrouselList: true,
        carrouselListData: action.payload,
      }
    case constants.CARROUSEL_GET_LIST_FAIL:
      return {
        loadingCarrouselList: false,
        errorCarrouselList: action.payload,
      }
    case constants.CARROUSEL_GET_LIST_RESET:
      return {}
    default:
      return state
  }
}

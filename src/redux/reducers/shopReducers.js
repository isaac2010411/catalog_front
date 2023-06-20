import * as constants from '../constants/shopConstants'

export const shopBranchOfficeRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SHOP_BRANCH_OFFICE_REGISTER_REQUEST:
      return { loadingshopBranchOfficeRegister: true }
    case constants.SHOP_BRANCH_OFFICE_REGISTER_SUCCESS:
      return {
        loadingshopBranchOfficeRegister: false,
        successshopBranchOfficeRegister: true,
        shopBranchOfficeRegisterData: action.payload,
      }
    case constants.SHOP_BRANCH_OFFICE_REGISTER_FAIL:
      return {
        loadingshopBranchOfficeRegister: false,
        errorshopBranchOfficeRegister: action.payload,
      }
    case constants.SHOP_BRANCH_OFFICE_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

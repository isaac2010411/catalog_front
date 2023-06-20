import * as constants from '../constants/branchOfficeConstants'

export const branchOfficeRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.BRANCH_OFFICE_REGISTER_REQUEST:
      return { loadingBranchOfficeRegister: true }
    case constants.BRANCH_OFFICE_REGISTER_SUCCESS:
      return {
        loadingBranchOfficeRegister: false,
        successBranchOfficeRegister: true,
        branchOfficeRegisterData: action.payload,
      }
    case constants.BRANCH_OFFICE_REGISTER_FAIL:
      return {
        loadingBranchOfficeRegister: false,
        errorBranchOfficeRegister: action.payload,
      }
    case constants.BRANCH_OFFICE_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const branchOfficeCoordinatesRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.BRANCH_OFFICE_REGISTER_COORDINATES_REQUEST:
      return { loadingBranchOfficeCoordinatesRegister: true }
    case constants.BRANCH_OFFICE_REGISTER_COORDINATES_SUCCESS:
      return {
        loadingBranchOfficeCoordinatesRegister: false,
        successBranchOfficeCoordinatesRegister: true,
        branchOfficeCoordinatesRegisterData: action.payload,
      }
    case constants.BRANCH_OFFICE_REGISTER_COORDINATES_FAIL:
      return {
        loadingBranchOfficeCoordinatesRegister: false,
        errorBranchOfficeCoordinatesRegister: action.payload,
      }
    case constants.BRANCH_OFFICE_REGISTER_COORDINATES_RESET:
      return {}
    default:
      return state
  }
}

export const branchOfficeGetReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.BRANCH_OFFICE_GET_REQUEST:
      return { loadingBranchOfficeGet: true }
    case constants.BRANCH_OFFICE_GET_SUCCESS:
      return {
        loadingBranchOfficeGet: false,
        successBranchOfficeGet: true,
        branchOfficeGetData: action.payload,
      }
    case constants.BRANCH_OFFICE_GET_FAIL:
      return {
        loadingBranchOfficeGet: false,
        errorBranchOfficeGet: action.payload,
      }
    case constants.BRANCH_OFFICE_GET_RESET:
      return {}
    default:
      return state
  }
}

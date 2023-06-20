import * as constants from '../constants/supplierConstants'

export const brandRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SUPPLIER_REGISTER_REQUEST:
      return { loadingBrandRegister: true }
    case constants.SUPPLIER_REGISTER_SUCCESS:
      return {
        loadingBrandRegister: false,
        successBrandRegister: true,
        brandRegisterData: action.payload,
      }
    case constants.SUPPLIER_REGISTER_FAIL:
      return {
        loadingBrandRegister: false,
        errorBrandRegister: action.payload,
      }
    case constants.SUPPLIER_REGISTER_RESET:
      return {}
    default:
      return state
  }
}
export const brandGetListReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SUPPLIER_GET_LIST_REQUEST:
      return { loadingBrandGetList: true }
    case constants.SUPPLIER_GET_LIST_SUCCESS:
      return {
        loadingBrandGetList: false,
        successBrandGetList: true,
        brandGetListData: action.payload,
      }
    case constants.SUPPLIER_GET_LIST_FAIL:
      return {
        loadingBrandGetList: false,
        errorBrandGetList: action.payload,
      }
    case constants.SUPPLIER_GET_LIST_RESET:
      return {}
    default:
      return state
  }
}
export const supplierGetProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SUPPLIER_GET_PRODUCTS_REQUEST:
      return { loadingSupplierGetProducts: true }
    case constants.SUPPLIER_GET_PRODUCTS_SUCCESS:
      return {
        loadingSupplierGetProducts: false,
        successSupplierGetProducts: true,
        supplierGetProductsData: action.payload,
      }
    case constants.SUPPLIER_GET_PRODUCTS_FAIL:
      return {
        loadingSupplierGetProducts: false,
        errorSupplierGetProducts: action.payload,
      }
    case constants.SUPPLIER_GET_PRODUCTS_RESET:
      return {}
    default:
      return state
  }
}

export const supplierGetProductsPageReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SUPPLIER_GET_PRODUCTS_PAGE_REQUEST:
      return { loadingSupplierGetProductsPage: true }
    case constants.SUPPLIER_GET_PRODUCTS_PAGE_SUCCESS:
      return {
        loadingSupplierGetProductsPage: false,
        successSupplierGetProductsPage: true,
        supplierGetProductsPageData: action.payload,
      }
    case constants.SUPPLIER_GET_PRODUCTS_PAGE_FAIL:
      return {
        loadingSupplierGetProductsPage: false,
        errorSupplierGetProductsPage: action.payload,
      }
    case constants.SUPPLIER_GET_PRODUCTS_PAGE_RESET:
      return {}
    default:
      return state
  }
}

export const brandGetListByCategoryIdReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SUPPLIER_GET_LIST_BY_CATEGORY_ID_REQUEST:
      return { loadingBrandGetListByCategoryId: true }
    case constants.SUPPLIER_GET_LIST_BY_CATEGORY_ID_SUCCESS:
      return {
        loadingBrandGetListByCategoryId: false,
        successBrandGetListByCategoryId: true,
        brandGetListByCategoryIdData: action.payload,
      }
    case constants.SUPPLIER_GET_LIST_BY_CATEGORY_ID_FAIL:
      return {
        loadingBrandGetListByCategoryId: false,
        errorBrandGetListByCategoryId: action.payload,
      }
    case constants.SUPPLIER_GET_LIST_BY_CATEGORY_ID_RESET:
      return {}
    default:
      return state
  }
}

export const brandDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SUPPLIER_DELETE_REQUEST:
      return { loadingBrandDelete: true }
    case constants.SUPPLIER_DELETE_SUCCESS:
      return {
        loadingBrandDelete: false,
        successBrandDelete: true,
        brandDeleteData: action.payload,
      }
    case constants.SUPPLIER_DELETE_FAIL:
      return {
        loadingBrandDelete: false,
        errorBrandDelete: action.payload,
      }
    case constants.SUPPLIER_DELETE_RESET:
      return {}
    default:
      return state
  }
}
export const brandUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SUPPLIER_UPDATE_REQUEST:
      return { loadingBrandUpdate: true }
    case constants.SUPPLIER_UPDATE_SUCCESS:
      return {
        loadingBrandUpdate: false,
        successBrandUpdate: true,
        brandUpdateData: action.payload,
      }
    case constants.SUPPLIER_UPDATE_FAIL:
      return {
        loadingBrandUpdate: false,
        errorBrandUpdate: action.payload,
      }
    case constants.SUPPLIER_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const supplierUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SUPPLIER_UPLOAD_PRODUCTS_REQUEST:
      return { loadingSupplierUpdate: true }
    case constants.SUPPLIER_UPLOAD_PRODUCTS_SUCCESS:
      return {
        loadingSupplierUpdate: false,
        successSupplierUpdate: true,
        supplierUpdateData: action.payload,
      }
    case constants.SUPPLIER_UPLOAD_PRODUCTS_FAIL:
      return {
        loadingSupplierUpdate: false,
        errorSupplierUpdate: action.payload,
      }
    case constants.SUPPLIER_UPLOAD_PRODUCTS_RESET:
      return {}
    default:
      return state
  }
}

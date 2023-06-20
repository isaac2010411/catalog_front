import { combineReducers } from 'redux'
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
  userUpdateMyInfoReducer,
  userListReducer,
  userRegisterByAdminReducer,
  userDeleteReducer,
} from './userReducers'

import {
  categoryRegisterReducer,
  categoryGetListReducer,
  categoryDeleteReducer,
  categoryUpdateReducer,
} from './categoryReducers'

import {
  brandRegisterReducer,
  brandGetListReducer,
  brandGetListByCategoryIdReducer,
  brandDeleteReducer,
  brandUpdateReducer,
  supplierUpdateReducer,
  supplierGetProductsReducer,
  supplierGetProductsPageReducer,
} from './supplierReducers'

import { locationByCPReducer } from './locationReducers'
import {
  branchOfficeRegisterReducer,
  branchOfficeCoordinatesRegisterReducer,
  branchOfficeGetReducer,
} from './branchOfficeReducers'

import {
  addressRegisterReducer,
  addressesByUserIdReducer,
  addressUpdateReducer,
  addressDeleteReducer,
  addressUpdateCoordinatesReducer,
} from './addressReducers'

import {
  productRegisterReducer,
  productGetAllReducer,
  productDeleteReducer,
  productUpdateReducer,
} from './productsReducers'

import {
  geteratePaymentLinkReducer,
  getOrdersByAdminReducer,
  getOrderByAdminReducer,
  getOrdersByUserIdReducer,
  updateOrderReducer,
  geterateOrderReducer,
} from './orderReducers'
import { myOrdersReducer, myOrderReducer } from './myOrderReducers'
import { notificationListReducer } from './notificationReducers'

import { dashboardGetDataReducer } from './dashboardReducers'
import { stockGetAllReducer } from './stockReducers'
import { carrouselRegisterReducer, carrouselListReducer } from './carrouselReducers'

export default combineReducers({
  dashboardGetData: dashboardGetDataReducer,
  stockGetAll: stockGetAllReducer,

  carrouselRegister: carrouselRegisterReducer,
  carrouselList: carrouselListReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  userUpdateMyInfo: userUpdateMyInfoReducer,
  userList: userListReducer,
  userRegisterByAdmin: userRegisterByAdminReducer,
  userDelete: userDeleteReducer,

  categoryRegister: categoryRegisterReducer,
  categoryGetList: categoryGetListReducer,
  categoryDelete: categoryDeleteReducer,
  categoryUpdate: categoryUpdateReducer,

  brandRegister: brandRegisterReducer,
  brandGetList: brandGetListReducer,
  brandGetListByCategoryId: brandGetListByCategoryIdReducer,
  brandDelete: brandDeleteReducer,
  brandUpdate: brandUpdateReducer,
  supplierUpdate: supplierUpdateReducer,
  supplierGetProducts: supplierGetProductsReducer,
  supplierGetProductsPage: supplierGetProductsPageReducer,

  productRegister: productRegisterReducer,
  productGetAll: productGetAllReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,

  geteratePaymentLink: geteratePaymentLinkReducer,
  getOrdersByAdmin: getOrdersByAdminReducer,
  getOrderByAdmin: getOrderByAdminReducer,
  getOrdersByUserId: getOrdersByUserIdReducer,
  geterateOrder: geterateOrderReducer,
  updateOrder: updateOrderReducer,

  myOrders: myOrdersReducer,
  myOrder: myOrderReducer,
  notificationList: notificationListReducer,

  locationByCP: locationByCPReducer,

  addressRegister: addressRegisterReducer,
  addressesByUserId: addressesByUserIdReducer,
  addressUpdate: addressUpdateReducer,
  addressDelete: addressDeleteReducer,
  addressUpdateCoordinates: addressUpdateCoordinatesReducer,

  branchOfficeRegister: branchOfficeRegisterReducer,
  branchOfficeCoordinatesRegister: branchOfficeCoordinatesRegisterReducer,
  branchOfficeGet: branchOfficeGetReducer,
})

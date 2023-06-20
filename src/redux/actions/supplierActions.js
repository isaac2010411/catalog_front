import axios from 'axios'
import * as constants from '../constants/supplierConstants'

export const registerBrand = (brandData) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.SUPPLIER_REGISTER_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/suppliers', brandData, config)

    dispatch({ type: constants.SUPPLIER_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.SUPPLIER_REGISTER_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}
export const getBrandList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.SUPPLIER_GET_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/suppliers', config)

    dispatch({ type: constants.SUPPLIER_GET_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.SUPPLIER_GET_LIST_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}

export const getSupplierProductsList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.SUPPLIER_GET_PRODUCTS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/suppliers/products', config)

    dispatch({ type: constants.SUPPLIER_GET_PRODUCTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.SUPPLIER_GET_PRODUCTS_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}

export const getSupplierProductsListPage = (page) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.SUPPLIER_GET_PRODUCTS_PAGE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/suppliers/products?page=${page}`, config)

    dispatch({ type: constants.SUPPLIER_GET_PRODUCTS_PAGE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.SUPPLIER_GET_PRODUCTS_PAGE_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}
export const getBrandListByCategoryId = (categoryId) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.SUPPLIER_GET_LIST_BY_CATEGORY_ID_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/brands/categories/${categoryId}`, config)

    dispatch({ type: constants.SUPPLIER_GET_LIST_BY_CATEGORY_ID_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.SUPPLIER_GET_LIST_BY_CATEGORY_ID_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}

export const deleteBrand = (brandId) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.SUPPLIER_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.delete(`/api/brands/${brandId}`, config)

    dispatch({ type: constants.SUPPLIER_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.SUPPLIER_DELETE_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}

export const updateBrand = (brandData) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.SUPPLIER_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/brands/${brandData._id}`, brandData, config)

    dispatch({ type: constants.SUPPLIER_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.SUPPLIER_UPDATE_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}

export const uploadProductsFromSupplier = (brandData) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.SUPPLIER_UPLOAD_PRODUCTS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    let formData = new FormData()

    for (let key in brandData) {
      formData.append(key, brandData[key])
    }

    const { data } = await axios.put(`/api/suppliers/${brandData._id}`, formData, config)

    dispatch({ type: constants.SUPPLIER_UPLOAD_PRODUCTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: constants.SUPPLIER_UPLOAD_PRODUCTS_FAIL,
      payload: {
        message: error.response && error.response.data.message ? error.response.data.message : error.message,
        status: error.response && error.response.status,
      },
    })
  }
}

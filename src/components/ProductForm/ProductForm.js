import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, FormControl, InputLabel, Select, Grid, MenuItem } from '@mui/material'
import ProducTextField from './components/ProductTextFields'
import DragAndDropFile from './components/Drag&DropFile'
import { BRAND_GET_LIST_BY_CATEGORY_ID_RESET } from '../../redux/constants/brandConstants'
import { getBrandListByCategoryId } from '../../redux/actions/brandActions'
import AddStockComponent from '../AddStockComponent/AddStockComponent'
import CustomReactTable from '../CustomReactTable/CustomReactTable'

const ProductForm = ({ setProductState, productState, closeRegisterPoduct, update }) => {
  const dispatch = useDispatch()

  const { loadingProductRegister, successProductRegister } = useSelector((state) => state.productRegister)
  const { loadingProductUpdate, successProductUpdate } = useSelector((state) => state.productUpdate)
  const { categoryGetListData } = useSelector((state) => state.categoryGetList)
  const { brandGetListByCategoryIdData } = useSelector((state) => state.brandGetListByCategoryId)

  useEffect(() => {
    if (productState.update) {
      dispatch(getBrandListByCategoryId(productState.categoryId))
    }
  }, [productState.update, productState.categoryId, dispatch])

  return (
    <>
      {!categoryGetListData ? (
        'Cargando'
      ) : (
        <Grid container rowSpacing={3} columnSpacing={1}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='category-select-label'>Categoria *</InputLabel>
              <Select
                labelId='category-select-label'
                id='category-select'
                value={productState.categoryId}
                label='Categoria'
                fullWidth
                required={true}
                onChange={(e) => {
                  if (brandGetListByCategoryIdData) {
                    dispatch({ type: BRAND_GET_LIST_BY_CATEGORY_ID_RESET })
                  }
                  dispatch(getBrandListByCategoryId(e.target.value))
                  setProductState({ ...productState, categoryId: e.target.value, brandId: '' })
                }}
              >
                {categoryGetListData?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            {productState.update && brandGetListByCategoryIdData ? (
              <FormControl fullWidth>
                <InputLabel id='brand-id-select-label'>Marca *</InputLabel>
                <Select
                  labelId='brand-id-select-label'
                  id='brand-id-select'
                  value={productState.brandId}
                  label='Marcas'
                  fullWidth
                  required={true}
                  onChange={(e) => setProductState({ ...productState, brandId: e.target.value })}
                >
                  {brandGetListByCategoryIdData &&
                    brandGetListByCategoryIdData.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            ) : !productState.update ? (
              <FormControl fullWidth>
                <InputLabel id='brand-id-select-label'>Marca *</InputLabel>
                <Select
                  labelId='brand-id-select-label'
                  id='brand-id-select'
                  value={productState.brandId}
                  label='Marcas'
                  fullWidth
                  disabled={!brandGetListByCategoryIdData || brandGetListByCategoryIdData.length < 1}
                  required={true}
                  onChange={(e) => setProductState({ ...productState, brandId: e.target.value })}
                >
                  {brandGetListByCategoryIdData &&
                    brandGetListByCategoryIdData?.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            ) : (
              <>Cargando</>
            )}
          </Grid>
          <ProducTextField productState={productState} setProductState={setProductState} />
          <DragAndDropFile productState={productState} setProductState={setProductState} />{' '}
          {!update && (
            <>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <AddStockComponent productState={productState} setProductState={setProductState} update />
              </Grid>
              {productState.stocks.length > 0 && (
                <Grid item xs={12}>
                  <CustomReactTable
                    columns={[
                      {
                        Header: 'ID',
                        accessor: 'id',
                      },
                      {
                        Header: 'Tipo',
                        accessor: 'type',
                      },
                      {
                        Header: 'Precio Uni',
                        accessor: 'unitPrice',
                      },
                      {
                        Header: 'Cantidad',
                        accessor: 'quantity',
                      },
                      {
                        Header: 'Nro Fac',
                        accessor: 'invoiceNumber',
                      },
                      {
                        Header: 'U. de Medida',
                        accessor: 'unitOfMeasurement',
                      },
                      {
                        Header: '',
                        accessor: 'actions',
                        // Cell: (prop) => <div style={{ textAlign: 'end' }}>{prop.row.original.actions}</div>,
                      },
                    ]}
                    data={
                      productState.update ? productState.stocks : productState.stocks.map((item) => JSON.parse(item))
                    }
                  />
                </Grid>
              )}
            </>
          )}
          {productState.update ? (
            <>
              <Grid item xs={12} md={6}>
                <Button color='secondary' onClick={closeRegisterPoduct} fullWidth variant='contained'>
                  Cancelar
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button color='secondary' type='submit' disabled={loadingProductUpdate} fullWidth variant='contained'>
                  {loadingProductUpdate ? 'Editando' : successProductUpdate ? 'Editado' : 'Editar'}
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} md={6}>
                <Button color='secondary' onClick={closeRegisterPoduct} fullWidth variant='contained'>
                  Cancelar
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button color='secondary' type='submit' disabled={loadingProductRegister} fullWidth variant='contained'>
                  {loadingProductRegister ? 'Guardando' : successProductRegister ? 'Guardado' : 'Guardar'}
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      )}
    </>
  )
}

export default ProductForm

import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button, IconButton, Grid } from '@mui/material'
import CustomModal from '../../../components/CustomModal/CustomModal'
import { Edit } from '@mui/icons-material'
import { useCallback, useEffect, useState } from 'react'
import { updateBrand } from '../../../redux/actions/supplierActions'

const UpdateBrandModal = ({ item }) => {
  const dispatch = useDispatch()

  const [updateBrandModal, setUpdateBrandModal] = useState(false)
  const [updateSupplierState, setUpdateSupplierState] = useState({
    _id: item._id,
    supplierPhone: item.supplierPhone,
    supplierAddress: item.supplierAddress,
    supplierName: item.supplierName,
  })

  const closeModalUpdateBrand = useCallback(() => {
    return setUpdateBrandModal(() => false)
  }, [])

  const { loadingBrandUpdate, successBrandUpdate } = useSelector((state) => state.brandUpdate)

  useEffect(() => {
    let timeOut
    if (successBrandUpdate) {
      timeOut = setTimeout(() => {
        closeModalUpdateBrand()
      }, 1000)
    }
    return () => clearTimeout(timeOut)
  }, [dispatch, successBrandUpdate, closeModalUpdateBrand])

  const openModalUpdateBrand = () => {
    setUpdateBrandModal(true)
  }

  const handleBrandUpdate = (e) => {
    e.preventDefault()
    dispatch(updateBrand(updateSupplierState))
  }

  return (
    <CustomModal
      openButton={
        <IconButton color='primary' onClick={openModalUpdateBrand}>
          <Edit />
        </IconButton>
      }
      isOpen={updateBrandModal}
      title={'Editar Marca'}
      children={
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              label='Proveedor'
              style={{ marginTop: '10px' }}
              required={true}
              fullWidth
              variant='outlined'
              value={updateSupplierState.providerName}
              onChange={(e) => setUpdateSupplierState({ ...updateSupplierState, supplierName: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Telefono'
              style={{ marginTop: '10px' }}
              required={true}
              fullWidth
              variant='outlined'
              value={updateSupplierState.name}
              onChange={(e) => setUpdateSupplierState({ ...updateSupplierState, supplierPhone: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Direccion'
              style={{ marginTop: '10px' }}
              required={true}
              fullWidth
              variant='outlined'
              value={updateSupplierState.name}
              onChange={(e) => setUpdateSupplierState({ ...updateSupplierState, supplierAddress: e.target.value })}
            />
          </Grid>
        </Grid>
      }
      handleClose={closeModalUpdateBrand}
      actionButtons={
        <>
          <Button variant='contained' color='secondary' onClick={closeModalUpdateBrand}>
            Cancelar
          </Button>
          <Button variant='contained' color='secondary' type='submit' disabled={loadingBrandUpdate} form='Editar Marca'>
            {loadingBrandUpdate ? 'Editando' : successBrandUpdate ? 'Editado' : 'Editar'}
          </Button>
        </>
      }
      handleSubmit={handleBrandUpdate}
    />
  )
}

export default UpdateBrandModal

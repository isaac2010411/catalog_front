import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Add } from '@mui/icons-material'
import { TextField, Button, Grid } from '@mui/material'
import CustomModal from '../../../components/CustomModal/CustomModal'
import { registerBrand } from '../../../redux/actions/supplierActions'

const RegisterSupplierModal = () => {
  const dispatch = useDispatch()

  const supplierInitialState = {
    supplierPhone: '',
    supplierAddress: '',
    supplierName: '',
  }
  const [supplierModal, setSupplierModal] = useState(false)
  const [supplierState, setSupplierState] = useState(supplierInitialState)

  const { loadingBrandRegister, successBrandRegister } = useSelector((state) => state.brandRegister)

  const closeModal = useCallback(() => {
    return setSupplierModal(false)
  }, [])

  useEffect(() => {
    if (successBrandRegister) {
      closeModal()
      setSupplierState({ supplierPhone: '', supplierAddress: '', supplierName: '' })
    }
  }, [dispatch, successBrandRegister, closeModal])

  const openModal = () => {
    setSupplierModal(true)
  }
  const handleSupplierRegister = (e) => {
    e.preventDefault()
    dispatch(registerBrand(supplierState))
  }

  return (
    <CustomModal
      openButton={
        <Button startIcon={<Add />} variant='contained' color='secondary' onClick={openModal}>
          Nuevo proveedor
        </Button>
      }
      isOpen={supplierModal}
      title={'Registrar Proveedor'}
      children={
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              label='Proveedor'
              style={{ marginTop: '10px' }}
              required={true}
              fullWidth
              variant='outlined'
              value={supplierState.providerName}
              onChange={(e) => setSupplierState({ ...supplierState, supplierName: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Telefono'
              style={{ marginTop: '10px' }}
              required={true}
              fullWidth
              variant='outlined'
              value={supplierState.name}
              onChange={(e) => setSupplierState({ ...supplierState, supplierPhone: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Direccion'
              style={{ marginTop: '10px' }}
              required={true}
              fullWidth
              variant='outlined'
              value={supplierState.name}
              onChange={(e) => setSupplierState({ ...supplierState, supplierAddress: e.target.value })}
            />
          </Grid>
        </Grid>
      }
      handleClose={closeModal}
      actionButtons={
        <>
          <Button variant='contained' color='secondary' onClick={closeModal}>
            Cancelar
          </Button>
          <Button
            variant='contained'
            color='secondary'
            type='submit'
            disabled={loadingBrandRegister}
            form='Registrar Proveedor'
          >
            {loadingBrandRegister ? 'Guardando' : successBrandRegister ? 'Guardado' : 'Guardar'}
          </Button>
        </>
      }
      handleSubmit={handleSupplierRegister}
    />
  )
}

export default RegisterSupplierModal

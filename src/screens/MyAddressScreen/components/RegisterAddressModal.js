import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid } from '@mui/material'
import { Add } from '@mui/icons-material'
import CustomModal from '../../../components/CustomModal/CustomModal'
import AddressInputs from '../../../components/AddressInputs/AddressInputs'
import { getLocationByCp } from '../../../redux/actions/locationActions'
import { LOCATION_BY_CP_RESET } from '../../../redux/constants/locationConstants'
import { registerAddress } from '../../../redux/actions/addressActions'
import { ADDRESS_REGISTER_RESET } from '../../../redux/constants/addressConstants'

const RegisterAddressModal = () => {
  const dispatch = useDispatch()

  const myAddressInitialState = {
    name: '',
    cp: '',
    province: '',
    location: '',
    street: '',
    number: '',
    department: '',
    intersection1: '',
    intersection2: '',
    contactPhone: '',
    aditionalInfo: '',
    doorOrFloor: '',
  }

  const [address, setAddress] = useState(myAddressInitialState)
  const [registerAddressModal, setregisterAddressModal] = useState(false)

  const { loadingAddressRegister, successAddressRegister } = useSelector((state) => state.addressRegister)
  const { locationByCpData, successLocationByCp } = useSelector((state) => state.locationByCP)

  const addProvince = useCallback(() => {
    setAddress((t) => ({ ...t, province: locationByCpData[0].provincia }))
  }, [locationByCpData, setAddress])

  const closeRegisterAddressModal = useCallback(() => {
    return setregisterAddressModal(() => false)
  }, [])

  useEffect(() => {
    if (address.cp.toString().length === 4 && !successLocationByCp) {
      dispatch(getLocationByCp(address.cp))
    } else if (address.cp.toString().length < 4 && successLocationByCp) {
      dispatch({ type: LOCATION_BY_CP_RESET })
    }
  }, [address, successLocationByCp, dispatch])

  useEffect(() => {
    if (successLocationByCp) {
      addProvince()
    }
  }, [dispatch, addProvince, successLocationByCp])

  const openRegisterAddressModal = () => {
    setregisterAddressModal(true)
  }
  useEffect(() => {
    if (successAddressRegister) {
      dispatch({ type: ADDRESS_REGISTER_RESET })
      closeRegisterAddressModal()
      setAddress({
        name: '',
        cp: '',
        province: '',
        location: '',
        street: '',
        number: '',
        department: '',
        intersection1: '',
        intersection2: '',
        contactPhone: '',
        aditionalInfo: '',
      })
    }
  }, [dispatch, successAddressRegister, closeRegisterAddressModal])

  const handleRegisterAddress = (e) => {
    e.preventDefault()
    dispatch(registerAddress(address))
  }

  return (
    <CustomModal
      openButton={
        <Button startIcon={<Add />} variant='contained' color='secondary' onClick={openRegisterAddressModal}>
          Nueva direccion
        </Button>
      }
      isOpen={registerAddressModal}
      title={'Registrar Direccion'}
      children={
        <Grid container spacing={1}>
          <AddressInputs address={address} setAddress={setAddress} />
        </Grid>
      }
      handleClose={closeRegisterAddressModal}
      actionButtons={
        <>
          <Button variant='contained' color='secondary' onClick={closeRegisterAddressModal}>
            Cancelar
          </Button>
          <Button
            variant='contained'
            color='secondary'
            type='submit'
            disabled={loadingAddressRegister}
            form='Registrar Direccion'
          >
            {loadingAddressRegister ? 'Guardando' : successAddressRegister ? 'Guardado' : 'Guardar'}
          </Button>
        </>
      }
      handleSubmit={handleRegisterAddress}
    />
  )
}

export default RegisterAddressModal

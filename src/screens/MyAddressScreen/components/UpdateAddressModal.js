import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid, IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'
import CustomModal from '../../../components/CustomModal/CustomModal'
import AddressInputs from '../../../components/AddressInputs/AddressInputs'
import { getLocationByCp } from '../../../redux/actions/locationActions'
import { LOCATION_BY_CP_RESET } from '../../../redux/constants/locationConstants'
import { updateAddress } from '../../../redux/actions/addressActions'
import { ADDRESS_UPDATE_RESET } from '../../../redux/constants/addressConstants'

const UpdateAddressModal = ({ addressUpdate }) => {
  const dispatch = useDispatch()

  const [address, setAddress] = useState(addressUpdate)
  const [lastCp, setLastCp] = useState(addressUpdate.cp)
  const [updateAddressModal, setUpdateAddressModal] = useState(false)

  const { loadingAddressUpdate, successAddressUpdate } = useSelector((state) => state.addressUpdate)
  const { locationByCpData, successLocationByCp } = useSelector((state) => state.locationByCP)

  const addProvince = useCallback(() => {
    setAddress((t) => ({ ...t, province: locationByCpData[0].provincia }))
  }, [locationByCpData, setAddress])

  const closeUpdateAddressModal = useCallback(() => {
    return setUpdateAddressModal(() => false)
  }, [])

  useEffect(() => {
    if (address.cp.toString().length === 4 && address.cp !== lastCp && !successLocationByCp && updateAddressModal) {
      dispatch(getLocationByCp(address.cp))
      setLastCp(address.cp)
    } else if (address.cp.toString().length < 4 && successLocationByCp && updateAddressModal) {
      dispatch({ type: LOCATION_BY_CP_RESET })
    }
  }, [address, successLocationByCp, dispatch, updateAddressModal, lastCp])

  useEffect(() => {
    if (successLocationByCp) {
      addProvince()
    }
  }, [dispatch, addProvince, successLocationByCp])
  useEffect(() => {
    if (successAddressUpdate) {
      closeUpdateAddressModal()
      dispatch({ type: ADDRESS_UPDATE_RESET })
    }
  }, [dispatch, successAddressUpdate, closeUpdateAddressModal])

  const openUpdateAddressModal = () => {
    setUpdateAddressModal(true)
  }
  const handleUpdateAddress = (e) => {
    e.preventDefault()
    dispatch(updateAddress(address))
  }

  return (
    <CustomModal
      openButton={
        <IconButton onClick={openUpdateAddressModal}>
          <Edit />
        </IconButton>
      }
      isOpen={updateAddressModal}
      title={'Editar Direccion'}
      children={
        <Grid container spacing={1}>
          <AddressInputs address={address} setAddress={setAddress} />
        </Grid>
      }
      handleClose={closeUpdateAddressModal}
      actionButtons={
        <>
          <Button variant='contained' color='secondary' onClick={closeUpdateAddressModal}>
            Cancelar
          </Button>
          <Button
            variant='contained'
            color='secondary'
            type='submit'
            disabled={loadingAddressUpdate}
            form='Editar Direccion'
          >
            {loadingAddressUpdate ? 'Editando' : successAddressUpdate ? 'Editado' : 'Editar'}
          </Button>
        </>
      }
      handleSubmit={handleUpdateAddress}
    />
  )
}

export default UpdateAddressModal

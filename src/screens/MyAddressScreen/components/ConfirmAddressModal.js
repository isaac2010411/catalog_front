import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid, IconButton } from '@mui/material'
import { ShareLocation } from '@mui/icons-material'
import CustomModal from '../../../components/CustomModal/CustomModal'
import { updateAddressCoordinates } from '../../../redux/actions/addressActions'
import { ADDRESS_UPDATE_COORDINATES_RESET } from '../../../redux/constants/addressConstants'
import AddressPlace from './AddressPlace'

const ConfirmAddressModal = ({ address }) => {
  const dispatch = useDispatch()
  const { coordinates } = address

  const [confirmAddressAddressModal, setConfirmAddressAddressModal] = useState(false)
  const [newCoordinates, setNewCoordinates] = useState([
    coordinates[0]?.coordinates[1] || '-34.5997',
    coordinates[0]?.coordinates[0] || '-58.3819',
  ])

  const { loadingAddressUpdateCoordinates, successAddressUpdateCoordinates } = useSelector(
    (state) => state.addressUpdateCoordinates
  )

  const closeConfirmAddressAddressModal = useCallback(() => {
    return setConfirmAddressAddressModal(() => false)
  }, [])

  useEffect(() => {
    if (successAddressUpdateCoordinates) {
      closeConfirmAddressAddressModal()
      dispatch({ type: ADDRESS_UPDATE_COORDINATES_RESET })
    }
  }, [dispatch, successAddressUpdateCoordinates, closeConfirmAddressAddressModal])

  const openConfirmAddressAddressModal = () => {
    setConfirmAddressAddressModal(true)
  }
  const handleConfirmAddress = (e) => {
    e.preventDefault()
    let updatedData
    if (Array.isArray(newCoordinates)) {
      const data = coordinates.filter(
        (item) => item.coordinates[1] === newCoordinates[0] && item.coordinates[0] === newCoordinates[1]
      )
      updatedData = {
        _id: address._id,
        coordinates: data[0],
      }
    } else {
      let { lat, lng } = newCoordinates
      updatedData = {
        _id: address._id,
        coordinates: [lng, lat],
      }
    }
    dispatch(updateAddressCoordinates(updatedData))
  }

  return (
    <CustomModal
      openButton={
        <IconButton onClick={openConfirmAddressAddressModal}>
          <ShareLocation color={!address.isCoordinatesChecked ? 'inherit' : 'success'} />
        </IconButton>
      }
      isOpen={confirmAddressAddressModal}
      title={'Confirmar Direccion'}
      children={
        <Grid container spacing={1}>
          <Grid item>
            <p>
              Pon el marcador en tu direccion asi podemos ubicarte mas facil y estimar de mejor manera los gastos de
              envios.
            </p>
          </Grid>

          <Grid item xs={12}>
            <AddressPlace
              isCoordinatesChecked={address.isCoordinatesChecked}
              newCoordinates={newCoordinates}
              setNewCoordinates={setNewCoordinates}
            />
          </Grid>
        </Grid>
      }
      handleClose={closeConfirmAddressAddressModal}
      actionButtons={
        <>
          <Button variant='contained' color='secondary' onClick={closeConfirmAddressAddressModal}>
            Cancelar
          </Button>
          <Button
            variant='contained'
            color='secondary'
            type='submit'
            disabled={loadingAddressUpdateCoordinates || address.isCoordinatesChecked}
            form='Confirmar Direccion'
          >
            {loadingAddressUpdateCoordinates
              ? 'Confirmando'
              : successAddressUpdateCoordinates
              ? 'Confirmado'
              : 'Confirmar'}
          </Button>
        </>
      }
      handleSubmit={handleConfirmAddress}
    />
  )
}

export default ConfirmAddressModal

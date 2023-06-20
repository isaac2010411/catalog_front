import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import CustomModal from '../../../components/CustomModal/CustomModal'
import { deleteAddress } from '../../../redux/actions/addressActions'
import { ADDRESS_DELETE_RESET } from '../../../redux/constants/addressConstants'

const DeleteAddressModal = ({ addressDelete }) => {
  const dispatch = useDispatch()

  const [updateAddressModal, setUpdateAddressModal] = useState(false)

  const { loadingAddressDelete, successAddressDelete } = useSelector((state) => state.addressDelete)

  const closeUpdateAddressModal = useCallback(() => {
    return setUpdateAddressModal(() => false)
  }, [])

  useEffect(() => {
    if (successAddressDelete) {
      closeUpdateAddressModal()
      dispatch({ type: ADDRESS_DELETE_RESET })
    }
  }, [dispatch, successAddressDelete, closeUpdateAddressModal])

  const openUpdateAddressModal = () => {
    setUpdateAddressModal(true)
  }
  const handleDeleteAddress = (e) => {
    e.preventDefault()
    dispatch(deleteAddress(addressDelete))
  }

  return (
    <CustomModal
      openButton={
        <IconButton onClick={openUpdateAddressModal}>
          <Delete />
        </IconButton>
      }
      isOpen={updateAddressModal}
      title={'Eliminar Direccion'}
      children={
        <Grid container spacing={1}>
          <Grid item>
            Esta seguro que desea eliminar la direccion calle <b>{addressDelete.street}</b> numero{' '}
            <b>{addressDelete.number}?</b>
          </Grid>
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
            disabled={loadingAddressDelete}
            form='Eliminar Direccion'
          >
            {loadingAddressDelete ? 'Eliminando' : successAddressDelete ? 'Eliminado' : 'Eliminar'}
          </Button>
        </>
      }
      handleSubmit={handleDeleteAddress}
    />
  )
}

export default DeleteAddressModal

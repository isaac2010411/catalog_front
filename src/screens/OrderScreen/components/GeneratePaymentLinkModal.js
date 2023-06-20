import { useDispatch, useSelector } from 'react-redux'
import { Paid } from '@mui/icons-material'
import { Button, Box, IconButton } from '@mui/material'
import CustomModal from '../../../components/CustomModal/CustomModal'
import { useCallback, useEffect, useState } from 'react'
import { generatePaymentLink } from '../../../redux/actions/orderActions'
import { add, format } from 'date-fns'

const GeneratePaymentLinkModal = ({ item }) => {
  const dispatch = useDispatch()

  const [deleteBrandModal, setDeleteBrandModal] = useState(false)

  const { loadingGeneratePaymentLink, successGeneratePaymentLink } = useSelector((state) => state.geteratePaymentLink)

  const closeModalDeleteBrand = useCallback(() => {
    return setDeleteBrandModal(() => false)
  }, [])

  useEffect(() => {
    let timeOut
    if (successGeneratePaymentLink) {
      timeOut = setTimeout(() => {
        closeModalDeleteBrand()
      }, 1000)
    }
    return () => clearTimeout(timeOut)
  }, [dispatch, successGeneratePaymentLink, closeModalDeleteBrand])

  const openModalDeleteBrand = () => {
    setDeleteBrandModal(true)
  }
  const handleGeneratePaymentLink = (e) => {
    e.preventDefault()
    delete item.address
    delete item.owner
    dispatch(
      generatePaymentLink({
        _id: item._id,
        date_of_expiration: format(new Date(add(new Date(), { hours: 1 })), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
      })
    )
  }

  return (
    <CustomModal
      openButton={
        <IconButton color='info' onClick={openModalDeleteBrand}>
          <Paid />
        </IconButton>
      }
      isOpen={deleteBrandModal}
      title={'Generar link de pago'}
      children={
        <Box sx={{ width: '100%', padding: '15px' }}>
          Esta completamente seguro que desea generar un link de pago para el usuario <b>{item.user.name}</b> por el
          importe de{' '}
          <b>
            ${' '}
            {item.products
              .map((p) => p.publicPrice)
              .reduce((previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue), 0)
              .toFixed(2)}
          </b>
        </Box>
      }
      handleClose={closeModalDeleteBrand}
      actionButtons={
        <>
          <Button variant='outlined' color='secondary' onClick={closeModalDeleteBrand}>
            Cancelar
          </Button>
          <Button
            variant='contained'
            color='secondary'
            type='submit'
            disabled={loadingGeneratePaymentLink}
            form='Generar link de pago'
          >
            {loadingGeneratePaymentLink ? 'Generando' : successGeneratePaymentLink ? 'Generado' : 'Generar'}
          </Button>
        </>
      }
      handleSubmit={handleGeneratePaymentLink}
    />
  )
}

export default GeneratePaymentLinkModal

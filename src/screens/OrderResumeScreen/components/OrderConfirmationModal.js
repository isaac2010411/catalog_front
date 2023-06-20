import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid } from '@mui/material'
import CustomModal from '../../../components/CustomModal/CustomModal'

const OrderConfirmationModal = ({ handleOrder }) => {
  const dispatch = useDispatch()

  const [categoryModal, setCategoryModal] = useState(false)

  const { loadingGeneratePaymentLink, successGeneratePaymentLink } = useSelector((state) => state.geteratePaymentLink)

  const closeModal = useCallback(() => {
    return setCategoryModal(false)
  }, [])

  const openModal = () => {
    setCategoryModal(true)
  }

  return (
    <CustomModal
      openButton={
        <Button variant='contained' color='secondary' onClick={openModal}>
          Iniciar Orden
        </Button>
      }
      isOpen={categoryModal}
      title={'Confirmar orden'}
      children={
        <Grid container>
          <Grid item>
            <p>Recibira un whatsApp con un link de pago para abonar su pedido</p>
            <p>El link de pago tiene una vigencia de 24 hs</p>
            <p>Una ves recibido el pago se despacha el pedido dentro de las 24 a 48 hs</p>
          </Grid>
        </Grid>
      }
      handleClose={closeModal}
      actionButtons={
        <>
          <Button variant='outlined' color='secondary' onClick={closeModal}>
            Cancelar
          </Button>
          <Button
            variant='contained'
            color='secondary'
            type='submit'
            disabled={loadingGeneratePaymentLink}
            form='Confirmar orden'
          >
            {loadingGeneratePaymentLink ? 'confirmando' : successGeneratePaymentLink ? 'confirmado' : 'confirmar'}
          </Button>
        </>
      }
      handleSubmit={handleOrder}
    />
  )
}

export default OrderConfirmationModal

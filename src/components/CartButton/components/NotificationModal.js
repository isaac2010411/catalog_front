import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import CustomModal from '../../../components/CustomModal/CustomModal'

const NotificationModal = ({ showNotificationInfo, handleCloseNotificationModal, notificationModal }) => {
  const { loadingUserRegisterByAdmin, successUserRegisterByAdmin } = useSelector((state) => state.userRegisterByAdmin)

  const handleRegisterUserByAdmin = (e) => {
    e.preventDefault()
    window.location.href = showNotificationInfo.paymentLink
  }

  return (
    <CustomModal
      isOpen={notificationModal}
      title={`Notificacion ${showNotificationInfo.title}`}
      children={<>{showNotificationInfo.message}</>}
      handleClose={handleCloseNotificationModal}
      actionButtons={
        <>
          <Button color='secondary' onClick={handleCloseNotificationModal} variant='outlined'>
            Cancelar
          </Button>
          <Button
            color='secondary'
            type='submit'
            disabled={loadingUserRegisterByAdmin}
            variant='contained'
            form={`Notificacion ${showNotificationInfo.title}`}
          >
            {loadingUserRegisterByAdmin ? 'Guardando' : successUserRegisterByAdmin ? 'Guardado' : 'Pagar'}
          </Button>
        </>
      }
      handleSubmit={handleRegisterUserByAdmin}
    />
  )
}

export default NotificationModal

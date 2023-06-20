import { Button, InputLabel, MenuItem, FormControl, Select, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomModal from '../../../components/CustomModal/CustomModal'
import { updateOrder } from '../../../redux/actions/orderActions'
import { ORDER_UPDATE_RESET } from '../../../redux/constants/ordersConstants'
import { Add } from '@mui/icons-material'

const UpdateOrderModal = ({ orderState }) => {
  const dispatch = useDispatch()

  const [orderModal, setOrderModal] = useState(false)
  const [orderSt, setOrderState] = useState(orderState)

  const values = [
    { _id: 'created', name: 'Creado' },
    { _id: 'packaging', name: 'Emaquetando' },
    { _id: 'onDelivery', name: 'En Delibery' },
    { _id: 'delivered', name: 'Entregado' },
  ]

  const { successUpdateOrder, loadingUpdateOrder } = useSelector((state) => state.updateOrder)

  useEffect(() => {
    let timeOut
    if (successUpdateOrder) {
      timeOut = setTimeout(() => {
        setOrderModal(false)
        dispatch({ type: ORDER_UPDATE_RESET })
      }, 1500)
    }
    return () => clearTimeout(timeOut)
  }, [successUpdateOrder, setOrderModal, dispatch])

  const handleUpdateOrder = (e) => {
    e.preventDefault()

    const data = {
      _id: orderSt._id,
      orderStatus: orderSt.status,
    }

    dispatch(updateOrder(data))
  }

  return (
    <CustomModal
      openButton={
        <Button startIcon={<Add />} variant='outlined' fullWidth color='secondary' onClick={() => setOrderModal(true)}>
          Cambiar
        </Button>
      }
      isOpen={orderModal}
      title={`Actualizar Orden`}
      children={
        <Grid container sx={{ minWidth: { sm: '200px', md: '400px' }, padding: '15px' }} spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id='update-order-state-select-label'>Estado de la orden</InputLabel>
              <Select
                labelId='update-order-state-select-label'
                id='update-order-state-select'
                value={orderSt.status}
                label='Estado de la orden'
                fullWidth
                required={true}
                onChange={(e) => setOrderState({ ...orderSt, status: e.target.value })}
              >
                {values?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      }
      handleClose={() => setOrderModal(false)}
      actionButtons={
        <>
          <Button variant='contained' color='secondary' onClick={() => setOrderModal(false)}>
            Cancelar
          </Button>
          <Button
            variant='contained'
            type='submit'
            disabled={loadingUpdateOrder || successUpdateOrder}
            form={`Actualizar Orden`}
          >
            {loadingUpdateOrder ? 'Editando' : successUpdateOrder ? 'Editado' : 'Editar'}
          </Button>
        </>
      }
      handleSubmit={handleUpdateOrder}
    />
  )
}

export default UpdateOrderModal

import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import CustomPageTable from '../../components/CustomPageTable/CustomPageTable'
import Loader from '../../components/Loader/Loader'
import ItemNotFound from '../../components/ItemNotFound/ItemNotFound'
import DeleteAddressModal from './components/DeleteAddressModal'
import RegisterAddressModal from './components/RegisterAddressModal'
import UpdateAddressModal from './components/UpdateAddressModal'
import { getAddressByUserId } from '../../redux/actions/addressActions'
import ConfirmAddressModal from './components/ConfirmAddressModal'

const MyAddressScreen = () => {
  const dispatch = useDispatch()

  const [addresses, setAddresses] = useState([])
  const { userInfo } = useSelector((state) => state.userLogin)
  const { loadingAddressesByUserId, addressesByUserIdData } = useSelector((state) => state.addressesByUserId)
  const { addressRegisterData } = useSelector((state) => state.addressRegister)
  const { addressUpdateData } = useSelector((state) => state.addressUpdate)
  const { addressDeleteData } = useSelector((state) => state.addressDelete)
  const { addressUpdateCoordinatesData } = useSelector((state) => state.addressUpdateCoordinates)

  const getAddressesByUser = useCallback(() => {
    return setAddresses(addressesByUserIdData)
  }, [addressesByUserIdData])

  useEffect(() => {
    dispatch(getAddressByUserId(userInfo._id))
  }, [dispatch, userInfo._id])
  useEffect(() => {
    if (addressesByUserIdData) {
      getAddressesByUser()
    }
  }, [getAddressesByUser, addressesByUserIdData])
  useEffect(() => {
    if (addressRegisterData) {
      setAddresses((prev) => [...prev, addressRegisterData])
    } else if (addressUpdateData) {
      const dataUpdated = addresses.map((address) => {
        if (address._id === addressUpdateData._id) {
          return {
            ...address,
            ...addressUpdateData,
          }
        }
        return address
      })
      setAddresses(dataUpdated)
    } else if (addressDeleteData) {
      const dataUpdated = addresses.filter((address) => address._id !== addressDeleteData._id)
      setAddresses(dataUpdated)
    }
    if (addressUpdateCoordinatesData) {
      const dataUpdated = addresses.map((address) => {
        if (address._id === addressUpdateCoordinatesData._id) {
          address.coordinates = addressUpdateCoordinatesData.coordinates
          address.isCoordinatesChecked = addressUpdateCoordinatesData.isCoordinatesChecked
          return {
            ...address,
          }
        }
        return address
      })
      setAddresses(dataUpdated)
    }
  }, [
    dispatch,
    addressRegisterData,
    setAddresses,
    addressUpdateData,
    addresses,
    addressDeleteData,
    addressUpdateCoordinatesData,
  ])

  return (
    <CustomPageTable pageName={'Mis Direcciones'}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', alignItems: 'center' }}>
        <h4 style={{ fontSize: '1.5rem' }}>Mis Direcciones</h4>
        <RegisterAddressModal />
      </div>

      {loadingAddressesByUserId ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Loader />
        </div>
      ) : addresses.length < 1 ? (
        <ItemNotFound text='No se encontraron direcciones para agregar una presione en Nueva direccion' />
      ) : (
        addresses.map((address) => (
          <Card key={address._id} style={{ marginTop: '22px' }}>
            <CardContent style={{ marginTop: '22px' }}>
              <Grid container>
                <Grid item alignItems='center' xs={12} sm={6} md={3}>
                  <Typography variant='subtitle1'>
                    <b>{address.name}</b>
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={12} sm={12} md={5}>
                  <Typography variant='subtitle2'>
                    {address.number} {address.street}, {address.location}
                  </Typography>
                </Grid>
                <Grid item alignItems='center' xs={12} sm={6} md={2}>
                  <Typography variant='subtitle2'>{address.contactPhone}</Typography>
                </Grid>
                <Grid item alignItems='center' xs={12} sm={6} md={2} style={{ display: 'flex', justifyContent: 'end' }}>
                  <ConfirmAddressModal address={address} />
                  <UpdateAddressModal addressUpdate={address} />
                  <DeleteAddressModal addressDelete={address} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      )}
    </CustomPageTable>
  )
}

export default MyAddressScreen

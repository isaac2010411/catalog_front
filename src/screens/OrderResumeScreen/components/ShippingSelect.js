import { useDispatch, useSelector } from 'react-redux'
import { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Checkbox,
  Collapse,
  CardActions,
  Divider,
  Button,
} from '@mui/material'
import { styled } from '@mui/system'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Loader from '../../../components/Loader/Loader'
import { formatNumToCurrency } from '../../../shared/helpers/commonsFunctions'
import { AppContext } from '../../../contexts/AppContext'
import { getAddressByUserId } from '../../../redux/actions/addressActions'
import styles from '../styles/shippingSelectStyles'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const ShippingSelect = ({ selectShipping, setSelectShipping }) => {
  const dispatch = useDispatch()
  const { setShippingPrice, navigate } = useContext(AppContext)
  const [addresses, setAddresses] = useState([])

  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const { userInfo } = useSelector((state) => state.userLogin)
  const { addressesByUserIdData, loadingAddressesByUserId } = useSelector((state) => state.addressesByUserId)

  const getAddressesByUser = useCallback(() => {
    return setAddresses(addressesByUserIdData)
  }, [addressesByUserIdData])

  useEffect(() => {
    if (addressesByUserIdData) {
      getAddressesByUser()
    }
  }, [getAddressesByUser, addressesByUserIdData])

  return (
    <>
      <Card style={{ borderLeft: `solid 10px ${selectShipping === 1 ? 'blue' : 'grey'} ` }}>
        <CardContent sx={styles.selectCardContent}>
          <Grid container>
            <Grid item xs={11}>
              <Typography component='span'> Envio a domicilio</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={() => [dispatch(getAddressByUserId(userInfo._id)), handleExpandClick()]}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <Divider />
          <CardContent>
            <Grid container display='flex' justifyContent='center' alignItems='center'>
              {loadingAddressesByUserId ? (
                <Grid item xs={2}>
                  <Loader />
                </Grid>
              ) : addresses.length < 1 ? (
                <>
                  Para registrar una ubicacion por favor haga click{' '}
                  <Button color='secondary' onClick={() => navigate('my-addresses')}>
                    aqui
                  </Button>
                </>
              ) : (
                addresses.map((address) => (
                  <Fragment key={address._id}>
                    <Grid item alignItems={'center'} xs={12} sm={6} md={3}>
                      <Typography variant='subtitle1'>
                        <b>{address.name}</b>
                      </Typography>
                    </Grid>
                    <Grid item alignItems={'center'} xs={12} sm={12} md={6}>
                      <Typography variant='subtitle2'>
                        {address.number} {address.street}, {address.location}
                      </Typography>
                    </Grid>
                    <Grid item alignItems={'center'} xs={12} sm={6} md={2}>
                      {!address.isCoordinatesChecked ? (
                        <Typography variant='subtitle2'>Valida tu direccion para continuar</Typography>
                      ) : (
                        <Typography variant='subtitle1'>{formatNumToCurrency(address.shippingPrice)}</Typography>
                      )}
                    </Grid>
                    <Grid
                      item
                      alignItems={'center'}
                      xs={12}
                      sm={6}
                      md={1}
                      style={{ display: 'flex', justifyContent: 'end' }}
                    >
                      <Checkbox
                        disabled={!address.isCoordinatesChecked}
                        color='secondary'
                        checked={selectShipping === address._id}
                        onClick={() => [setSelectShipping(address._id), setShippingPrice(address.shippingPrice)]}
                      />
                    </Grid>
                  </Fragment>
                ))
              )}
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </>
  )
}

export default ShippingSelect

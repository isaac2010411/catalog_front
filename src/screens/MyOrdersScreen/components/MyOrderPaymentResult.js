import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CelebrationIcon from '@mui/icons-material/Celebration'
import { Button, Card, CardActions, CardContent, Grid } from '@mui/material'
import Page from '../../../components/Page/Page'
import { AppContext } from '../../../contexts/AppContext'

const MyOrderPaymentResult = () => {
  const { navigate } = useContext(AppContext)
  const [searchParams] = useSearchParams()
  const statusPayment = searchParams.get('status')

  return (
    <Page title='Resultado de pago'>
      <Grid
        container
        rowSpacing={1}
        justifyContent='center'
        direction='row'
        alignItems='center'
        style={{ padding: '15px 15px 80px 15px' }}
      >
        {statusPayment === 'approved' ? (
          <Grid item xs={12} style={{ marginTop: '20%' }}>
            <Card style={{ width: '100%' }}>
              <CardContent style={{ textAlign: 'center', padding: '20px' }}>
                <CelebrationIcon color='action' style={{ fontSize: '200px' }} />
                <h1> ¡Tu pedido está completo!</h1>
                <h4>Recibirá un correo electrónico de confirmación con los detalles del pedido.</h4>
              </CardContent>{' '}
              <CardActions style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                <Button onClick={() => navigate('/')} color='secondary' variant='contained'>
                  Nueva Orden
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ) : statusPayment === 'rejected' || statusPayment === 'null' ? (
          <Grid item xs={12} style={{ marginTop: '20%' }}>
            <Card style={{ width: '100%' }}>
              <CardContent style={{ textAlign: 'center', padding: '20px' }}>
                <ErrorOutlineIcon color='error' style={{ fontSize: '200px' }} />
                <h1> ¡Sucedio un error!</h1>
                <h4>Ocurrio un error al procesar el pago, por favor intente nuevamente mas tarde.</h4>
              </CardContent>{' '}
              <CardActions style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                <Button onClick={() => navigate('/')} color='secondary' variant='contained'>
                  Nueva Orden
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ) : statusPayment === 'pending' ? (
          <Grid item xs={12} style={{ marginTop: '20%' }}>
            <Card style={{ width: '100%' }}>
              <CardContent style={{ textAlign: 'center', padding: '20px' }}>
                <AccessTimeIcon color='disabled' style={{ fontSize: '200px' }} />
                <h1> ¡Estamos procesando tu pago!</h1>
                <h4>Podes ver la evolucion del pago desde la pantalla de mis ordenes.</h4>
              </CardContent>{' '}
              <CardActions style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                <Button onClick={() => navigate('/')} color='secondary' variant='contained'>
                  Nueva Orden
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ) : (
          statusPayment === null && <></>
        )}
      </Grid>
    </Page>
  )
}

export default MyOrderPaymentResult

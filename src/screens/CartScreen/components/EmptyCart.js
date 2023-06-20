import { useNavigate } from 'react-router-dom'
import { Button, Grid, Typography } from '@mui/material'
import CartEmptySvg from '../../../assets/emptyCart.svg'

const EmptyCart = () => {
  const navigate = useNavigate()

  return (
    <>
      <Grid item xs={12} md={10}>
        <Typography variant='h3' align='center'>
          Carrito Vacio
        </Typography>
        <Typography variant='subtitle1' align='center' style={{ paddingBottom: '15px' }}>
          Probablemente aún no hayas seleccionado nada. Para seleccionar y ordenar, vaya a la página principal.
        </Typography>
        <img
          src={CartEmptySvg}
          alt='empty-cart'
          style={{
            objectPosition: 'center',
            aspectRatio: '4 / 4',
            width: ' 100%',
            height: '100%',
            maxHeight: '400px',
            padding: '5px',
            borderRadius: '10px',
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={10}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '25px' }}
      >
        <Button variant='contained' color='secondary' onClick={() => navigate('/')}>
          Ir a Tienda
        </Button>
      </Grid>
    </>
  )
}

export default EmptyCart

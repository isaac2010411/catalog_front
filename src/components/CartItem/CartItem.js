import { useContext } from 'react'
import { Close, AddCircle, RemoveCircle } from '@mui/icons-material'
import { Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import { intermediateCurrency } from '../../shared/helpers/commonsFunctions'
import { AppContext } from '../../contexts/AppContext'

const CarItem = ({ item }) => {
  const { addToCart, substractToCart, quitToCart } = useContext(AppContext)
  return (
    <Card style={{ marginBottom: '1rem' }}>
      <CardHeader
        title={item.title}
        action={
          <>
            <IconButton onClick={() => quitToCart(item)}>
              <Close />
            </IconButton>
          </>
        }
      />
      <CardContent>
        <Grid container sx={{ justifyContent: { sm: 'space-between' } }} display='flex'>
          <>
            <Grid
              item
              xs={12}
              sm={7}
              md={8}
              sx={{
                display: 'flex',
                justifyContent: { xs: 'space-between', sm: 'space-around', md: 'flex-start' },
                alignItems: 'center',
              }}
            >
              <CardMedia
                component='img'
                sx={{ width: { xs: 150, sm: 160 }, marginRight: { md: '1rem' } }}
                image={item.image}
                alt={item.title}
              />
              <div>
                <span>$ {item.publicPrice} x 1u</span>
                <br />
                <IconButton color='secondary' disabled={item.quantity < 2} onClick={() => substractToCart(item)}>
                  <RemoveCircle />
                </IconButton>
                <Typography variant='span'>{item.quantity}</Typography>
                <IconButton color='secondary' onClick={() => addToCart(item)}>
                  <AddCircle />
                </IconButton>
              </div>
            </Grid>
          </>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, alignItems: 'flex-end' }}
          >
            <Typography variant='h6' color='text.primary'>
              {intermediateCurrency((item.publicPrice * item.quantity).toFixed(2).toString())}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CarItem

import { useContext } from 'react'
import { makeStyles } from '@mui/styles'
import { Add } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { AppContext } from '../../contexts/AppContext'
import ViewProductModal from '../ViewProductModal/ViewProductModal'
import productCardStyles from './styles/productCardStyles'

const useStyles = makeStyles(productCardStyles)

const ProductCard = ({ product }) => {
  const classes = useStyles()

  const { addToCart } = useContext(AppContext)

  return (
    <Grid item className={classes.productContainer} xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.productCard}>
        <CardMedia className={classes.productMedia} component='img' image={`${product.image}`} alt={product.product} />
        <CardContent className={classes.productCardContent}>
          <ViewProductModal item={product} icon={true} />
          <Grid container direction='row' justifyContent='space-around' alignItems='center'>
            <Grid item xs={12}>
              <Typography variant='body1' textAlign='center'>
                {product.supplier.supplierName === '1422' ? '' : '$'} {product.price} c/u
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body2'>{product.product.toUpperCase()}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' textAlign='center'>
                {product.supplier.supplierName}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        {product.price && (
          <CardActions>
            <Button
              className={classes.productButtonStyle}
              variant='contained'
              size='small'
              color='secondary'
              fullWidth
              startIcon={<Add />}
              onClick={() =>
                addToCart({
                  _id: product._id,
                  title: product.product,
                  image: `${product.image}`,
                  quantity: 1,
                  available: 1000,
                  publicPrice: product.price,
                  supplierName: product.supplier.supplierName,
                })
              }
            >
              Agregar al carrito
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  )
}

export default ProductCard

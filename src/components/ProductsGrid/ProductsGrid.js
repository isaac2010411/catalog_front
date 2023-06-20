import { Grid } from '@mui/material'
import ProductCard from '../ProductCard/ProductCard'

const ProductGrid = ({ data }) => {
  return (
    <Grid container justifyContent='center' alignItems='center' spacing={{ xs: 3 }} mt={5} pb={5}>
      {data.map((item) => (
        <ProductCard key={item._id} product={item} />
      ))}
    </Grid>
  )
}

export default ProductGrid

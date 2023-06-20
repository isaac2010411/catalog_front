
import {
  Card,
  CardContent,
  FormControl,
  Grid,
  TextField,
} from '@mui/material'
import CategotyList from '../../../components/CategoryList/CategoryList'

const ProductFilterDatabase = () => {
  return (
    <Grid container>
      <Grid item xs={12} mb={5}>
        <Card
          style={{
            width: '100%',
            minHeight: '12rem',
            paddingTop: '1rem',


            // backgroundColor:'#EAFAF1'
          }}
        >
          <CardContent>
            <Grid container>
              <Grid item xs={12} md={10} margin={'0 auto'} mb={5}>
                <FormControl variant='filled' style={{ width: '100%' }}>
                  {/* <InputLabel htmlFor='outlined-adornment-password'>Buscar</InputLabel> */}
                  <TextField id='outlined-adornment-password' type={'text'} fullWidth label='Buscar' />
                </FormControl>
              </Grid>{' '}
              <Grid item xs={12} md={10} margin={'0 auto'} style={{ overflowX: 'auto', display: 'inline-flex' }}>
                <CategotyList />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>{' '}
    </Grid>
  )
}

export default ProductFilterDatabase

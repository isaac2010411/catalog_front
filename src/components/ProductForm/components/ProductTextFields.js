import { TextField, Grid, FormGroup, FormControlLabel, Switch } from '@mui/material'

const ProducTextField = ({ setProductState, productState }) => {
  return (
    <>
      <Grid item xs={12} sm={4}>
        <TextField
          label='Nombre'
          required={true}
          variant='outlined'
          fullWidth
          value={productState.name}
          onChange={(e) => setProductState({ ...productState, name: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label='Descripcion'
          required={true}
          variant='outlined'
          fullWidth
          value={productState.description}
          onChange={(e) => setProductState({ ...productState, description: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label='Precio al publico'
          required={true}
          variant='outlined'
          fullWidth
          type={'number'}
          value={productState.publicPrice}
          onChange={(e) => setProductState({ ...productState, publicPrice: e.target.value })}
        />
      </Grid>

      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                color='secondary'
                checked={productState.published}
                onChange={() => setProductState({ ...productState, published: productState.published ? false : true })}
              />
            }
            label={productState.published ? 'Publicar' : 'No Publicar'}
          />
        </FormGroup>
      </Grid>
    </>
  )
}

export default ProducTextField

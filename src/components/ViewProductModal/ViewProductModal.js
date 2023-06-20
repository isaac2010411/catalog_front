import { useState } from 'react'
import { Visibility } from '@mui/icons-material'
import { Button, Box, Grid, Typography, IconButton } from '@mui/material'
import CustomModal from '../CustomModal/CustomModal'
import styles from './styles/viewProductModalStyles'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(styles)

const ViewProductModal = ({ item, icon }) => {
  const classes = useStyles()
  const [viewProductModal, setViewProductModal] = useState(false)

  const closeModalViewProduct = () => {
    setViewProductModal(false)
  }

  const openModalViewProduct = () => {
    setViewProductModal(true)
  }

  return (
    <CustomModal
      openButton={
        icon ? (
          <IconButton color='secondary' onClick={openModalViewProduct}>
            <Visibility />
          </IconButton>
        ) : (
          <p className={classes.viewPublicName} onClick={openModalViewProduct}>
            {item.name}
          </p>
        )
      }
      isOpen={viewProductModal}
      title={'Ver Producto'}
      children={
        <Box p={1}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <img className={classes.viewProductImage} src={`${item.image}`} alt={item.product} />
            </Grid>
            <Grid item xs={12} md={6} p={2} textAlign='center'>
              <Typography variant='h4'>
                <b>{item.product}</b>
              </Typography>

              <Typography variant='h1' className={classes.viewPublicPrice}>
                $ <b>{item.price}</b>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      }
      handleClose={closeModalViewProduct}
      actionButtons={
        <>
          <Button variant='contained' color='secondary' onClick={closeModalViewProduct}>
            Cerrar
          </Button>
        </>
      }
    />
  )
}

export default ViewProductModal

import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  FormHelperText,
  Typography,
  Avatar,
} from '@mui/material'
import CustomSnackbar from '../../components/CustomSnackBar/CustomSnackBar'
import { AppContext } from '../../contexts/AppContext'
import { login } from '../../redux/actions/userActions'
import styles from './styles/loginScreenStyles'
import image from '../../assets/hypnotic.gif'

const initialState = {
  email: '',
  password: '',
}

const LoginScreen = () => {
  const dispatch = useDispatch()
  let location = useLocation()

  let from = location.state?.from?.pathname || '/'

  const { navigate } = useContext(AppContext)

  const [signInState, setSignIngState] = useState(initialState)
  const [successMessage, setSuccessMesage] = useState('')
  const [alert, setAlert] = useState(false)

  const { loadingUserInfo, errorUserInfo, successUserInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (successUserInfo) {
      navigate(from, { replace: true })
      setAlert(true)
      setSuccessMesage('Iniciado correctamente')
      setSignIngState(initialState)
      setSuccessMesage('')
      setAlert(false)
    }
  }, [successUserInfo, from, navigate])

  useEffect(() => {
    let timeOut
    if (errorUserInfo) {
      setAlert(true)
      timeOut = setTimeout(() => {
        setAlert(false)
      }, 1500)
    }
    return () => clearTimeout(timeOut)
  }, [errorUserInfo, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(signInState))
  }

  return (
    <Grid sx={styles.rootContainer} container component={'form'} autoComplete='off' onSubmit={handleSubmit}>
      <Grid item xs={12} md={8} justifyContent='center' display='flex'>
        <Avatar
          src={image}
          alt=''
          sx={{ margin: '0 auto', height: { xs: '100px', md: '400px' }, width: { xs: '100px', md: '400px' } }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader
            sx={styles.loginCardHeader}
            avatar={'HGS'}
            title={<b>Hypnotic Grow Shop</b>}
            subheader='Iniciar sesion'
          />
          <CardContent>
            <Grid container justifyContent='center' alignItems='center' rowSpacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Email'
                  required={true}
                  variant='outlined'
                  type='email'
                  value={signInState.email}
                  onChange={(e) => setSignIngState({ ...signInState, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Contraseña'
                  required={true}
                  variant='outlined'
                  type='password'
                  autoComplete='false'
                  value={signInState.password}
                  onChange={(e) => setSignIngState({ ...signInState, password: e.target.value })}
                />
                <FormHelperText style={{ textAlign: 'end' }}>
                  Olvide mi <b style={{ cursor: 'pointer' }}>contraseña</b>
                </FormHelperText>
              </Grid>
              {successUserInfo && (
                <CustomSnackbar open={alert} setOpen={setAlert} message={successMessage} severity={'success'} />
              )}
              {errorUserInfo && (
                <CustomSnackbar open={alert} setOpen={setAlert} message={errorUserInfo} severity={'error'} />
              )}
            </Grid>
          </CardContent>
          <CardActions>
            <Button type='submit' fullWidth variant='contained' color='secondary'>
              {loadingUserInfo ? 'Ingresando...' : successUserInfo ? 'Ingreso' : 'Ingresar'}
            </Button>
          </CardActions>
          <Grid container marginTop={2} p={2}>
            <Grid item xs={12}>
              <Typography sx={styles.forgotPasswordContainer}>
                No tenes cuenta todavia?
                <Button variant='text' color='secondary' onClick={() => navigate('/sign-up')}>
                  Registrate
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LoginScreen

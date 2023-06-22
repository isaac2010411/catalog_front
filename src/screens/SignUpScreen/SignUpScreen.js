import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, TextField, Button, Card, CardContent, CardActions, CardHeader, Typography, Avatar } from '@mui/material'
import CustomSnackbar from '../../components/CustomSnackBar/CustomSnackBar'
import { AppContext } from '../../contexts/AppContext'
import { USER_REGISTER_RESET } from '../../redux/constants/userConstants'
import { registerUser } from '../../redux/actions/userActions'
import styles from './styles/signUpScreenStyles'
import image from '../../assets/hypnotic.gif'
const initialState = {
  name: '',
  email: '',
  password: '',
}

const SignUpScreen = () => {
  const dispatch = useDispatch()

  const { navigate } = useContext(AppContext)
  const [registerState, setRegisterState] = useState(initialState)
  const [successMessage, setSuccessMesage] = useState('')
  const [alert, setAlert] = useState(false)

  const { loadingUserRegister, successUserRegister, errorUserRegister } = useSelector((state) => state.userRegister)

  useEffect(() => {
    let timeOut
    if (successUserRegister) {
      setAlert(true)
      setSuccessMesage('Registrado correctamente')
      timeOut = setTimeout(() => {
        setRegisterState(initialState)
        setSuccessMesage('')
        dispatch({ type: USER_REGISTER_RESET })
        setAlert(false)
      }, 1500)
    }

    return () => clearTimeout(timeOut)
  }, [successUserRegister, dispatch])

  useEffect(() => {
    let timeOut
    if (errorUserRegister) {
      setAlert(true)
      timeOut = setTimeout(() => {
        dispatch({ type: USER_REGISTER_RESET })
        setAlert(false)
      }, 1500)
    }
    return () => clearTimeout(timeOut)
  }, [errorUserRegister, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(registerState))
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
            subheader='Registrate'
          />
          <CardContent>
            <Grid container justifyContent='center' alignItems='center' rowSpacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Nombre'
                  required={true}
                  variant='outlined'
                  value={registerState.name}
                  onChange={(e) => setRegisterState({ ...registerState, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Email'
                  required={true}
                  variant='outlined'
                  type='email'
                  value={registerState.email}
                  onChange={(e) => setRegisterState({ ...registerState, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Contraseña'
                  required={true}
                  variant='outlined'
                  type='password'
                  value={registerState.password}
                  onChange={(e) => setRegisterState({ ...registerState, password: e.target.value })}
                />
              </Grid>
              {successUserRegister && (
                <CustomSnackbar open={alert} setOpen={setAlert} message={successMessage} severity={'success'} />
              )}
              {errorUserRegister && (
                <CustomSnackbar open={alert} setOpen={setAlert} message={errorUserRegister} severity={'error'} />
              )}
            </Grid>
          </CardContent>
          <CardActions>
            <Button type='submit' variant='contained' fullWidth color='secondary'>
              {loadingUserRegister ? 'Registrando...' : successUserRegister ? 'Registrado' : 'Registrate'}
            </Button>
          </CardActions>
          <Grid container marginTop={2} p={2}>
            <Grid item xs={12}>
              <Typography sx={styles.forgotPasswordContainer}>
                Ya tenes cuenta?
                <Button variant='text' color='secondary' onClick={() => navigate('/sign-in')}>
                  Ingresar
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SignUpScreen

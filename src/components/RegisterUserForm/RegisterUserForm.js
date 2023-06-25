import { TextField, Grid, FormGroup, FormControlLabel, Switch } from '@mui/material'
import { useSelector } from 'react-redux'

const RegisterUserForm = ({ userState, setUserState }) => {
  const { userInfo } = useSelector((state) => state.userLogin)

  const handleIsAdmin = (e) => {
    if (userState.isSuper && !e.target.checked) {
      setUserState({ ...userState, isSuper: false, isAdmin: e.target.checked })
    } else {
      setUserState({ ...userState, isAdmin: e.target.checked })
    }
  }
  const handleIsSuper = (e) => {
    setUserState({ ...userState, isAdmin: e.target.checked, isSuper: e.target.checked })
  }

  const handleIsAlias = (e) => {
    if (userState.alias && !e.target.checked) {
      setUserState({ ...userState, alias: false, cbu: true })
    } else {
      setUserState({ ...userState, alias: true, cbu: false })
    }
  }
  const handleIsCBU = (e) => {
    if (userState.cbu && !e.target.checked) {
      setUserState({ ...userState, alias: true, cbu: false })
    } else {
      setUserState({ ...userState, alias: false, cbu: true })
    }

    // setUserState({ ...userState, cbu: e.target.checked, alias: e.target.checked })
  }
  const handleIsActive = (e) => {
    setUserState({ ...userState, isActive: e.target.checked })
  }

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center' spacing={{ xs: 1 }}>
      <Grid item xs={12} md={6}>
        <TextField
          label='Nombre'
          required={true}
          fullWidth
          variant='outlined'
          value={userState.name}
          onChange={(e) => setUserState({ ...userState, name: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label='Apellido'
          fullWidth
          variant='outlined'
          value={userState.lastName}
          onChange={(e) => setUserState({ ...userState, lastName: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label='Email'
          required={true}
          fullWidth
          variant='outlined'
          value={userState.email}
          type='email'
          onChange={(e) => setUserState({ ...userState, email: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label='Telefono'
          required={true}
          fullWidth
          variant='outlined'
          value={userState.phone}
          type='text'
          onChange={(e) => setUserState({ ...userState, phone: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label='DNI'
          fullWidth
          variant='outlined'
          value={userState.dni}
          type='number'
          onChange={(e) => setUserState({ ...userState, dni: e.target.value })}
        />
      </Grid>
      {userState && userState.isAdmin && !userState.isSuper && (
        <>
          {' '}
          <Grid item xs={12} md={9}>
            <TextField
              label={userState.alias ? 'Alias' : 'CBU'}
              fullWidth
              required={userState.isAdmin}
              variant='outlined'
              value={userState.accountValue}
              type={userState.alias ? 'text' : 'number'}
              autoComplete='false'
              onChange={(e) => setUserState({ ...userState, accountValue: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormGroup>
              <FormControlLabel
                control={<Switch color='secondary' onChange={handleIsCBU} checked={userState.cbu} />}
                label='CBU'
              />
              <FormControlLabel
                control={<Switch color='secondary' onChange={handleIsAlias} checked={userState.alias} />}
                label='ALIAS'
              />
            </FormGroup>
          </Grid>{' '}
        </>
      )}
      <Grid item xs={12} md={6}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                disabled={userInfo?.role !== 'superadministrator'}
                color='secondary'
                onChange={handleIsAdmin}
                checked={userState.isAdmin}
              />
            }
            label='Administrador'
          />
          <FormControlLabel
            control={
              <Switch
                disabled={userInfo?.role !== 'superadministrator'}
                color='secondary'
                onChange={handleIsSuper}
                checked={userState.isSuper}
              />
            }
            label='Super Administrador'
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormGroup>
          <FormControlLabel
            control={<Switch color='secondary' onChange={handleIsActive} checked={userState.isActive} />}
            label='Activar'
          />
        </FormGroup>
      </Grid>
    </Grid>
  )
}

export default RegisterUserForm

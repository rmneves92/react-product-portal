import { useEffect, useState } from 'react'
import { useUser } from '@/context/userContext'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Alert, Button, Snackbar, TextField, Typography } from '@mui/material'
import { useFetchUser } from '@/hooks/useFetchUser'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const { updateUser } = useUser()
  const navigate = useNavigate()
  const { fetchUser, isLoading, isError, user } = useFetchUser()

  const handleLogin = async () => {
    fetchUser(email, senha)
  }

  useEffect(() => {
    updateUser(null)
    Cookies.remove('token')
  }, [])

  useEffect(() => {
    if (!isLoading && user && !isError) {
      Cookies.set('token', user.token)
      updateUser(user)
      navigate('/home')
    } else if (!isLoading) {
      setShowAlert(true)
    }
  }, [user, isLoading, isError, updateUser, navigate])

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setShowAlert(false)
  }

  return (
    <section>
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Erro ao realizar o login
        </Alert>
      </Snackbar>

      <Typography variant="h1">Login</Typography>

      <form>
        <TextField
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Button variant="contained" onClick={handleLogin}>
          Entrar
        </Button>
      </form>
      {isLoading && <p>Carregando...</p>}
    </section>
  )
}

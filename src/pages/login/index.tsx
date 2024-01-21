import { useEffect, useState } from 'react'
import { useUser } from '@/context/userContext'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import {
  Alert,
  Button,
  Container,
  Paper,
  Snackbar,
  Typography
} from '@mui/material'
import { useFetchUser } from '@/hooks/useFetchUser'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { TextField } from '@/components/text-field'

const initialValues = {
  email: 'Jamir.Keeling57@hotmail.com',
  senha: 'kmbaWaQBBRVi2Cn'
}

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const { updateUser } = useUser()
  const navigate = useNavigate()
  const { fetchUser, isLoading, isError, user } = useFetchUser()

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Campo obrigatório'),
    senha: Yup.string().required('Campo obrigatório')
  })

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

  const handleLogin = async () => {
    fetchUser(email, password)
  }

  const handleRegister = () => {
    navigate('/registrar')
  }

  return (
    <>
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

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched }) => (
          <Container maxWidth="sm">
            <Paper
              elevation={3}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                margin: '20px auto'
              }}
            >
              <Form
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '60%'
                }}
              >
                <Typography variant="h4">Login</Typography>

                <TextField
                  label="E-mail"
                  fieldName="email"
                  errors={errors}
                  touched={touched}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Senha"
                  fieldName="senha"
                  type="password"
                  errors={errors}
                  touched={touched}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  variant="contained"
                  onClick={handleLogin}
                  style={{ marginTop: '2rem' }}
                >
                  Entrar
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleRegister}
                  style={{ marginTop: '2rem' }}
                >
                  Registrar
                </Button>
              </Form>
            </Paper>
          </Container>
        )}
      </Formik>
    </>
  )
}

import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import {
  Paper,
  Typography,
  Button,
  Container,
  Snackbar,
  Alert
} from '@mui/material'
import { TextField } from '@/components/text-field'
import { useNavigate } from 'react-router-dom'
import { useFetchUser } from '@/hooks/useFetchUser'
import { useState, useEffect } from 'react'
import { IUser } from '@/@types/user'

const initialValues = {
  nome: '',
  sobrenome: '',
  cpf: '',
  email: '',
  senha: '',
  dt_nascimento: ''
}

export const RegisterUser = () => {
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false)

  const { registerUser, isError } = useFetchUser()

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    sobrenome: Yup.string().required('Campo obrigatório'),
    cpf: Yup.string().required('Campo obrigatório'),
    email: Yup.string().required('Campo obrigatório'),
    senha: Yup.string().required('Campo obrigatório'),
    dt_nascimento: Yup.string().required('Campo obrigatório')
  })

  const handleSubmit = async (
    values: IUser,
    { resetForm }: FormikHelpers<IUser>
  ) => {
    try {
      await registerUser(values)
      resetForm()
    } catch (error) {
      console.error('Erro ao registrar usuário:', error)
      setShowAlert(true)
    }
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  useEffect(() => {
    if (isError) {
      setShowAlert(true)
    }
  }, [isError])

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleChange }) => (
        <Container maxWidth="sm">
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
              Não foi possível criar o usuário
            </Alert>
          </Snackbar>
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
              <Typography variant="h4">Cadastrar usuário</Typography>

              <TextField
                label="Nome"
                fieldName="nome"
                errors={errors}
                touched={touched}
                onChange={handleChange}
              />
              <TextField
                label="Sobrenome"
                fieldName="sobrenome"
                errors={errors}
                touched={touched}
              />
              <TextField
                label="CPF"
                fieldName="cpf"
                errors={errors}
                touched={touched}
              />
              <TextField
                label="E-mail"
                fieldName="email"
                errors={errors}
                touched={touched}
              />
              <TextField
                label="Senha"
                fieldName="senha"
                errors={errors}
                touched={touched}
                type="password"
              />
              <TextField
                label="Data de nascimento"
                fieldName="dt_nascimento"
                errors={errors}
                touched={touched}
                type="date"
              />

              <Button
                type="submit"
                variant="contained"
                style={{ marginTop: '2rem' }}
              >
                Cadastrar
              </Button>

              <Button
                type="button"
                variant="outlined"
                style={{ marginTop: '2rem' }}
                onClick={() => navigate('/login')}
              >
                Ir para login
              </Button>
            </Form>
          </Paper>
        </Container>
      )}
    </Formik>
  )
}

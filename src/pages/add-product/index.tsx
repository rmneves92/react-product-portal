import { Paper, Container, Snackbar, Alert } from '@mui/material'
import { ProductForm } from '@/components/product-form'
import { useProduct } from '@/hooks/useProduct'
import { Spinner } from '@/components/spinner'
import { useState } from 'react'

export const AddProduct = () => {
  const initialValues = {
    nome: '',
    avatar: '',
    preco: '',
    qt_estoque: 0,
    qt_vendas: 0,
    marca: ''
  }

  const [showAlert, setShowAlert] = useState(false)

  const { isLoading, addProductHandler } = useProduct('')

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await addProductHandler(values)
      resetForm()
      setShowAlert(true)
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setShowAlert(false)
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Container maxWidth="sm">
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Produto adicionado com sucesso
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
        <ProductForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          formTitle="Cadastrar Produto"
          buttonLabel="Adicionar"
        />
      </Paper>
    </Container>
  )
}

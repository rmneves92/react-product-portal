import { Paper, Container, Snackbar, Alert, Box } from '@mui/material'
import { ProductForm } from '@/components/product-form'
import { useParams } from 'react-router-dom'
import { useProduct } from '@/hooks/useProduct'
import { Spinner } from '@/components/spinner'
import { useState } from 'react'

export const EditProduct = () => {
  const { id } = useParams()
  const [showAlert, setShowAlert] = useState(false)

  const { data, error, isLoading, editProduct } = useProduct(id)

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  if (!data) {
    return <p>Produto não encontrado.</p>
  }

  const handleSubmit = (values, { resetForm }) => {
    editProduct(values)
    resetForm()
    setShowAlert(true)
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
          Produto editado com sucesso
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
          initialValues={data}
          onSubmit={handleSubmit}
          formTitle={`Editando produto ${data.nome}`}
          buttonLabel="Salvar"
        />
      </Paper>
    </Container>
  )
}

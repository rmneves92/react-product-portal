import { Paper, Container } from '@mui/material'
import { ProductForm } from '@/components/product-form'

export const AddProduct = () => {
  const initialValues = {
    nome: '',
    avatar: '',
    preco: '',
    qt_estoque: 0,
    qt_vendas: 0,
    marca: ''
  }

  const handleSubmit = (values, { resetForm }) => {
    resetForm()
  }

  return (
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
        <ProductForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          formTitle="Cadastrar Produto"
        />
      </Paper>
    </Container>
  )
}

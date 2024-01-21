import { useFetchProduct } from '@/hooks/useFetchProduct'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Typography,
  Button,
  Modal,
  Box,
  Paper,
  Grid,
  Container,
  CardMedia
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Spinner } from '@/components/spinner'

export const ProductDetails = () => {
  const { id } = useParams()
  const { data, error, isLoading, deleteProductHandler } = useFetchProduct(id)
  const navigate = useNavigate()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleEditClick = () => {
    navigate('edit')
  }

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    navigate('/home')
    deleteProductHandler()
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false)
  }

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  if (!data) {
    return <p>Produto não encontrado.</p>
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
        <Typography variant="h4" style={{ marginBottom: '10px' }}>
          {data.nome}
        </Typography>

        {data.avatar && (
          <CardMedia
            component="img"
            image={data.avatar}
            style={{ marginBottom: '10px' }}
          />
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography style={{ fontSize: '1.2rem' }}>
              <strong>Preço:</strong> R$ {parseFloat(data.preco).toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography style={{ fontSize: '1.2rem' }}>
              <strong>Quantidade em Estoque:</strong> {data.qt_estoque}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography style={{ fontSize: '1.2rem' }}>
              <strong>Quantidade de Vendas:</strong> {data.qt_vendas}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography style={{ fontSize: '1.2rem' }}>
              <strong>Marca:</strong> {data.marca}
            </Typography>
          </Grid>
        </Grid>

        <Box mt={3} display="flex" gap={2}>
          <Button
            variant="contained"
            onClick={handleEditClick}
            startIcon={<EditIcon />}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            onClick={handleDeleteClick}
            startIcon={<DeleteIcon />}
          >
            Remover
          </Button>
        </Box>

        <Modal open={isDeleteModalOpen} onClose={handleDeleteCancel}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4
            }}
          >
            <Typography variant="h6" gutterBottom>
              Tem certeza que deseja remover este produto?
            </Typography>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              sx={{ marginRight: '10px' }}
            >
              Confirmar
            </Button>
            <Button onClick={handleDeleteCancel} variant="outlined">
              Cancelar
            </Button>
          </Box>
        </Modal>
      </Paper>
    </Container>
  )
}

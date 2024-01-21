import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
  Modal,
  Box
} from '@mui/material'
import useTable from '@/hooks/useTable'
import { useFetchProducts } from '@/hooks/useFetchProducts'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IProduct } from '@/@types/product'
import { Spinner } from '@/components/spinner'

const rowsPerPage = 15

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

export const Home = () => {
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const navigate = useNavigate()

  const { data, error, isLoading } = useFetchProducts()
  const { slice, range }: { slice: any; range: number[] } = useTable(
    data,
    page,
    rowsPerPage
  )

  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value)
  }

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    handleOpen()
  }

  const goToProduct = (id: string) => {
    navigate(`/produto/${id}`)
  }

  return (
    <main>
      {/* Modal */}
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>

      {/* Products Grid */}
      <Container sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Stack spacing={2}>
            <Pagination
              count={range.length}
              page={page}
              onChange={handlePageChange}
              shape="rounded"
            />
          </Stack>
        </Box>

        <Grid container spacing={4}>
          {slice?.map((product: IProduct) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card
                onClick={() => goToProduct(product.id)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    cursor: 'pointer',
                    boxShadow: 5
                  }
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    pt: '56.25%'
                  }}
                  image={product.avatar}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.nome}
                  </Typography>
                  <Typography>Preço: {product.preco}</Typography>
                  <Typography>Qtd. estoque: {product.qt_estoque}</Typography>
                  <Typography>Qtd. vendas: {product.qt_vendas}</Typography>
                  <Typography>Marca: {product.marca}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View</Button>
                  <Button size="small">Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  )
}

export default Home

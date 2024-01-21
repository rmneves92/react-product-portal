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
  Box,
  Snackbar,
  Alert
} from '@mui/material'
import useTable from '@/hooks/useTable'
import { useFetchProducts } from '@/hooks/useFetchProducts'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IProduct } from '@/@types/product'
import { Spinner } from '@/components/spinner'

const rowsPerPage = 15

export const Home = () => {
  const { data, error, isLoading } = useFetchProducts()

  useEffect(() => {
    if (error) {
      setShowAlert(true)
    }
  }, [error])

  const [page, setPage] = useState(1)
  const [showAlert, setShowAlert] = useState(false)

  const navigate = useNavigate()

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

  const goToProduct = (id: string) => {
    navigate(`/produto/${id}`)
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
    <main>
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
          Erro recuperar produtos
        </Alert>
      </Snackbar>

      <Container sx={{ py: 8 }}>
        {slice.length ? (
          <>
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
                      <Typography>
                        Qtd. estoque: {product.qt_estoque}
                      </Typography>
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
          </>
        ) : null}
      </Container>
    </main>
  )
}

export default Home

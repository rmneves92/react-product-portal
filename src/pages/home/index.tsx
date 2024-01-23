import { Snackbar, Alert } from '@mui/material'
import { useProducts } from '@/hooks/useProducts'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '@/components/spinner'
import { CustomTable } from '@/components/table'

export const Home = () => {
  const { data, error, isLoading } = useProducts()

  useEffect(() => {
    if (error) {
      setShowAlert(true)
    }
  }, [error])

  const [showAlert, setShowAlert] = useState(false)

  const navigate = useNavigate()

  if (isLoading) {
    return <Spinner />
  }

  const goToProduct = (id: string) => {
    navigate(`/produto/${id}`)
  }

  const addNewProduct = () => {
    navigate(`/cadastrar`)
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

  console.log(data)

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

      {data && (
        <CustomTable
          rows={data}
          viewItem={goToProduct}
          addNewItem={addNewProduct}
        />
      )}
    </main>
  )
}

export default Home

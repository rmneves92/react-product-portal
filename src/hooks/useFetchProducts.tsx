import { useEffect, useState } from 'react'
import { api } from '@/utils/fetch/api'
import { IProduct } from '@/@types/product'

type ProductsApiResponse = {
  result: IProduct[]
}

async function fetchProducts(): Promise<ProductsApiResponse> {
  try {
    const response = await api.get<ProductsApiResponse>('/v1/produto')
    return response.data
  } catch (error) {
    throw new Error('Error fetching products')
  }
}

export const useFetchProducts = () => {
  const [data, setData] = useState<ProductsApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const productsData = await fetchProducts()
        if (isMounted) {
          setData(productsData)
        }
      } catch (err) {
        if (isMounted) {
          setError('Error fetching products')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])

  return { data, error, isLoading }
}

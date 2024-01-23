import { useEffect, useState } from 'react'
import { api } from '@/utils/fetch/api'
import { IProduct } from '@/@types/product'

type ProductApiResponse = IProduct

async function fetchProduct(productId: string): Promise<ProductApiResponse> {
  try {
    const response = await api.get<ProductApiResponse>(
      `/v1/produto/${productId}`
    )
    return response.data
  } catch (error) {
    throw new Error('Error fetching product')
  }
}

async function updateProduct(
  productId: string,
  updatedProduct: IProduct
): Promise<ProductApiResponse> {
  try {
    const response = await api.put<ProductApiResponse>(
      `/v1/produto/${productId}`,
      updatedProduct
    )
    return response.data
  } catch (error) {
    throw new Error('Error updating product')
  }
}

async function deleteProduct(productId: string): Promise<void> {
  try {
    await api.delete(`/v1/produto/${productId}`)
  } catch (error) {
    throw new Error('Error deleting product')
  }
}

async function addProduct(newProduct: IProduct): Promise<ProductApiResponse> {
  try {
    const response = await api.post<ProductApiResponse>(
      '/v1/produto',
      newProduct
    )
    return response.data
  } catch (error) {
    throw new Error('Error adding product')
  }
}

export const useProduct = (productId: string) => {
  const [data, setData] = useState<ProductApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const productData = await fetchProduct(productId)
        if (isMounted) {
          setData(productData)
        }
      } catch (err) {
        if (isMounted) {
          setError('Error fetching product')
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
  }, [productId])

  const editProduct = async (updatedProduct: IProduct) => {
    try {
      setIsLoading(true)
      const editedProduct = await updateProduct(productId, updatedProduct)
      setData(editedProduct)
    } catch (err) {
      setError('Error updating product')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteProductHandler = async (): Promise<void> => {
    try {
      await deleteProduct(productId)
    } catch (error) {
      throw new Error('Error deleting product')
    }
  }

  const addProductHandler = async (newProduct: IProduct): Promise<void> => {
    try {
      await addProduct(newProduct)
    } catch (error) {
      throw new Error('Error adding product')
    }
  }

  return {
    data,
    error,
    isLoading,
    editProduct,
    deleteProductHandler,
    addProductHandler
  }
}

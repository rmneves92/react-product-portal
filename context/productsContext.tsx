import React, { createContext, FC, useState } from 'react'
import { ProductContextType, IProduct } from '@/@types/product'

export const ProductContext = createContext<ProductContextType | null>(null)

const ProductProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([
    {
      createdAt: '2022-04-13T12:28:45.702Z',
      nome: 'Matthew Kuhn',
      avatar: 'https://cdn.fakercloud.com/avatars/gipsy_raf_128.jpg',
      preco: '653.28',
      qt_estoque: 65450,
      qt_vendas: 10870,
      marca: 'Incredible Plastic Soap',
      id: '86',
      product: {
        avatar: 'https://cdn.fakercloud.com/avatars/gipsy_raf_128.jpg',
        nome: 'Matthew Kuhn2',
        marca: 'Incredible Plastic Soap',
        preco: '653.28',
        qt_estoque: '65450',
        qt_vendas: '10870',
        createdAt: '2022-04-13T12:28:45.702Z',
        id: '86'
      }
    },
    {
      createdAt: '2022-04-13T02:28:43.612Z',
      nome: 'Andres Hills MD',
      avatar: 'https://cdn.fakercloud.com/avatars/embrcecreations_128.jpg',
      preco: '740.45',
      qt_estoque: 16149,
      qt_vendas: 57873,
      marca: 'Ergonomic Cotton Bike',
      id: '87'
    }
  ])

  const saveProduct = (product: IProduct) => {
    const newProduct: IProduct = {
      ...product,
      id: Math.random().toString()
    }
    setProducts([...products, newProduct])
  }

  return (
    <ProductContext.Provider value={{ products, saveProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider

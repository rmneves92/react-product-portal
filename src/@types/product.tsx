export interface IProduct {
  createdAt?: string
  nome: string
  avatar: string
  preco: string
  qt_estoque: number
  qt_vendas: number
  marca: string
  id?: string
  product?: {
    avatar: string
    nome: string
    marca: string
    preco: string
    qt_estoque: string
    qt_vendas: string
    createdAt: string
    id: string
  }
}

export type ProductContextType = {
  products: IProduct[]
  saveProduct: (product: IProduct) => void
}

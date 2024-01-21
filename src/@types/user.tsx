export interface IUser {
  nome: string
  sobrenome: string
  cpf: number
  sexo: string
  dt_nascimento: number
  cep: string
  cidade: string
  estado: string
  logradouro: string
  bairro: string
  complemento: number
  email: string
  senha: string
  token: string
  image: string
  id: string
}

export type UserContextType = {
  user: IUser | null
  updateUser: (newUser: IUser | null) => void
}

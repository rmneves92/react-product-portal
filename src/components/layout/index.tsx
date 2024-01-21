import { Routes } from '@/routes/routes'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

import * as S from './styles'

export function Layout() {
  return (
    <>
      <Header />
      <S.Wrapper>
        <Sidebar />
        <Routes />
      </S.Wrapper>
    </>
  )
}

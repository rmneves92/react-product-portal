import React, { FunctionComponent } from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '@/context/userContext'
import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import * as S from './styles'
import Cookies from 'js-cookie'

interface PrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  children
}) => {
  const { updateUser } = useUser()
  const userIsLogged = !!Cookies.get('token')

  if (!userIsLogged) {
    updateUser(null)
    return <Navigate to="/login" />
  }

  return (
    <>
      <Header />
      <S.Wrapper>
        <Sidebar />
        {children}
      </S.Wrapper>
    </>
  )
}

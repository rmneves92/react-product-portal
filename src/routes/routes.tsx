import { FC } from 'react'
import { Routes as DomRoutes } from 'react-router-dom'
import { PrivateRoute } from './private-route'
import { Route } from 'react-router-dom'
import { Login } from '@/pages/login'
import { Home } from '@/pages/home'
import { AddProduct } from '@/pages/add-product'

export const Routes: FC = () => {
  return (
    <DomRoutes>
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/add-product"
        element={
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<h1>Not found</h1>} />
    </DomRoutes>
  )
}

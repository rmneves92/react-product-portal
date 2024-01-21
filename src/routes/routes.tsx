import { FC } from 'react'
import { Routes as DomRoutes, Navigate } from 'react-router-dom'
import { PrivateRoute } from './private-route'
import { Route } from 'react-router-dom'
import { Login } from '@/pages/login'
import { Home } from '@/pages/home'
import { AddProduct } from '@/pages/add-product'
import { ProductDetails } from '@/pages/product-details'
import { RegisterUser } from '@/pages/register'
import { EditProduct } from '@/pages/edit-product'

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
        path="/cadastrar"
        element={
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        }
      />

      <Route
        path="/produto/:id"
        element={
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        }
      />

      <Route
        path="/produto/:id/edit"
        element={
          <PrivateRoute>
            <EditProduct />
          </PrivateRoute>
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="/registrar" element={<RegisterUser />} />

      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </DomRoutes>
  )
}

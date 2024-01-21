import React, { FunctionComponent } from 'react'
import routeConfig from './routes-list'
import { BrowserRouter, Route, Routes as DomRoutes } from 'react-router-dom'

export const renderMergedProps = (
  component: FunctionComponent,
  ...rest: any[]
) => {
  const finalProps = Object.assign({}, ...rest)

  return React.createElement(component, finalProps)
}

export function Routes() {
  return (
    <BrowserRouter>
      <DomRoutes>
        {routeConfig.map((route, i) => (
          <Route
            key={i}
            Component={(routeProps) =>
              route.component
                ? renderMergedProps(route.component, routeProps, route)
                : null
            }
            {...route}
          />
        ))}
        <Route element={<h1>Not found</h1>} />
      </DomRoutes>
    </BrowserRouter>
  )
}

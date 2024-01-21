import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import { UserProvider } from './context/userContext'
import { Routes } from '@/routes/routes'

export function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </UserProvider>
  )
}

export default App

import { CircularProgress } from '@mui/material'

export function Spinner() {
  return (
    <div
      style={{
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <CircularProgress />
    </div>
  )
}

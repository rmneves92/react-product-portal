import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Box
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import React, { useState } from 'react'
import { IProduct } from '@/@types/product'

const columns = [
  { id: 'avatar', label: 'Avatar' },
  { id: 'nome', label: 'Nome' },
  {
    id: 'preco',
    label: 'Preço',

    align: 'right',
    format: (value: string) => value
  },
  {
    id: 'qt_estoque',
    label: 'Qt. Estoque',

    align: 'right',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'qt_vendas',
    label: 'Qt. Vendas',

    align: 'right',
    format: (value: number) => value.toLocaleString('en-US')
  },
  { id: 'marca', label: 'Marca' },
  { id: 'actions', label: 'Ações' }
]

export function CustomTable({
  rows,
  viewItem,
  addNewItem
}: {
  rows: IProduct[]
  viewItem: (id: string) => void
  addNewItem: () => void
}) {
  console.log('rows', rows)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(15)
  const [filter, setFilter] = useState('')

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
    setPage(0)
  }

  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(filter.toLowerCase())
    )
  )

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: 2, margin: 4 }}>
      <Box display="flex" alignItems="center" mb={2} width="400px">
        <TextField
          label="Filtrar"
          variant="outlined"
          size="small"
          fullWidth
          value={filter}
          onChange={handleFilterChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={addNewItem}
          sx={{ marginLeft: 2 }}
        >
          Novo
        </Button>
      </Box>
      <TableContainer sx={{ width: '65vw', margin: '0 auto' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'avatar' ? (
                            <Avatar alt={row.nome} src={value} />
                          ) : column.format && typeof value === 'number' ? (
                            column.format(value)
                          ) : column.id === 'actions' ? (
                            <Button
                              size="small"
                              onClick={() => viewItem(row.id)}
                            >
                              Visualizar
                            </Button>
                          ) : (
                            value
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage={'Itens por página'}
        rowsPerPageOptions={[15, 25, 50]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

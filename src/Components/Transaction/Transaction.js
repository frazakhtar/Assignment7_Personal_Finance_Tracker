import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  TableSortLabel,
  CircularProgress,
} from '@mui/material'
import {Edit, Delete} from '@mui/icons-material'

import {
  createTransaction,
  editTransaction,
  fetchTransactions,
  removeTransaction,
} from '../../slices/transactionSlice'

// Utility for sorting
const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1)
}

const TransactionManager = () => {
  const dispatch = useDispatch()
  const {items: transactions, loading} = useSelector(
    (state) => state.transactions
  )
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    type: 'Expense',
    amount: '',
    category: '',
    date: '',
    description: '',
  })

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('date')

  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [dispatch])

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleOpen = (transaction = null) => {
    if (transaction) {
      setEditingId(transaction.id)
      setForm(transaction)
    } else {
      setEditingId(null)
      setForm({
        type: 'Expense',
        amount: '',
        category: '',
        date: '',
        description: '',
        currency: '$',
      })
    }
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleSave = () => {
    if (editingId) {
      dispatch(editTransaction({id: editingId, data: form}))
    } else {
      dispatch(createTransaction(form))
    }
    setOpen(false)
  }

  // Ask confirmation before delete
  const handleDeleteClick = (id) => {
    setDeleteId(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    dispatch(removeTransaction(deleteId))
    setDeleteDialogOpen(false)
    setDeleteId(null)
  }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const sortedTransactions = [...transactions].sort(
    getComparator(order, orderBy)
  )

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>
        Transaction List
      </Typography>
      <Button variant="contained" onClick={() => handleOpen()}>
        Add Transaction
      </Button>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{mt: 2}}>
          <Table>
            <TableHead>
              <TableRow>
                {['type', 'amount', 'category', 'date', 'description'].map(
                  (col) => (
                    <TableCell key={col}>
                      <TableSortLabel
                        active={orderBy === col}
                        direction={orderBy === col ? order : 'asc'}
                        onClick={() => handleRequestSort(col)}
                      >
                        {col.charAt(0).toUpperCase() + col.slice(1)}
                      </TableSortLabel>
                    </TableCell>
                  )
                )}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedTransactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.type}</TableCell>
                  <TableCell>${t.amount}</TableCell>
                  <TableCell>{t.category}</TableCell>
                  <TableCell>{t.date}</TableCell>
                  <TableCell>{t.description}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpen(t)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(t.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingId ? 'Edit Transaction' : 'Add Transaction'}
        </DialogTitle>
        <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
          <TextField
            select
            label="Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            margin="dense"
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </TextField>
          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            required
          />
          <TextField
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            InputLabelProps={{shrink: true}}
            required
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this transaction?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default TransactionManager

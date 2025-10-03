import React, {useEffect, useState, useRef} from 'react'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useDispatch, useSelector} from 'react-redux'
import {fetchTransactions} from '../../slices/transactionSlice'
import {addBudget} from '../../slices/budgetSlice'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material'

const BudgetsPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [dispatch])

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({category: '', budget: ''})

  const {items: transactions} = useSelector((state) => state.transactions)
  const {items: budgets} = useSelector((state) => state.budgets)

  const categories = [...new Set(transactions.map((t) => t.category))]

  const budgetsWithSpent = budgets.map((b) => {
    const spent = transactions
      .filter((t) => t.category === b.category && t.type === 'Expense')
      .reduce((sum, t) => sum + Number(t.amount), 0)
    return {...b, spent}
  })

  const prevBudgetsRef = useRef([])
  const prevTransactionsRef = useRef([])

  useEffect(() => {
    if (
      prevBudgetsRef.current.length === 0 &&
      prevTransactionsRef.current.length === 0
    ) {
      prevBudgetsRef.current = budgets
      prevTransactionsRef.current = transactions
      return
    }

    budgets.forEach((b) => {
      const spent = transactions
        .filter((t) => t.category === b.category && t.type === 'Expense')
        .reduce((sum, t) => sum + Number(t.amount), 0)

      if (spent > b.budget) {
        toast.error(`Overspending Alert! ${b.category} budget exceeded`, {
          toastId: `overspending-${b.category}`, // prevent duplicate toasts
        })
      }
    })

    prevBudgetsRef.current = budgets
    prevTransactionsRef.current = transactions
  }, [transactions, budgets])

  const handleOpen = () => {
    setForm({category: '', budget: ''})
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSave = () => {
    const existingBudget = budgets.find((b) => b.category === form.category)

    if (existingBudget) {
      toast.error(`Budget for "${form.category}" already exists!`)
      return
    }

    dispatch(
      addBudget({
        id: Date.now(),
        category: form.category,
        budget: Number(form.budget),
      })
    )

    toast.success(`Budget added for "${form.category}"!`)
    handleClose()
  }

  return (
    <Container sx={{py: 4}}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Budgets</Typography>
        <Button
          variant="contained"
          onClick={handleOpen}
          disabled={categories.length === 0}
        >
          Add Budget
        </Button>
      </Box>

      <Grid container spacing={3}>
        {budgetsWithSpent.map((b) => {
          const percent = Math.min((b.spent / b.budget) * 100, 100)
          const overspent = b.spent > b.budget
          return (
            <Grid item xs={12} md={6} key={b.id}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    {b.category}
                  </Typography>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">₹ {b.spent} spent</Typography>
                    <Typography variant="body2">
                      Budget: ₹ {b.budget}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={percent}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      mt: 1,
                      bgcolor: overspent ? 'error.light' : 'grey.300',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: overspent ? 'error.main' : 'primary.main',
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Budget</DialogTitle>
        <DialogContent
          sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 1}}
        >
          <TextField
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            select
            fullWidth
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Monthly Budget (₹)"
            name="budget"
            type="number"
            value={form.budget}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!form.category || !form.budget}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  )
}

export default BudgetsPage

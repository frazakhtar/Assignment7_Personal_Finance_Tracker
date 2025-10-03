import React, {useEffect, useState, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
} from '@mui/material'

import PiChart from './Charts/PiChart'
import Line_Chart from './Charts/Line_Chart'
import TodaysTable from './TodaysTable'
import {fetchTransactions} from '../../slices/transactionSlice'

const Dashboard = () => {
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const {items: transactions} = useSelector((state) => state.transactions)

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [dispatch])

  const filteredTransactions = useMemo(() => {
    if (!startDate && !endDate) {
      return transactions
    }

    return transactions.filter((t) => {
      const txDate = new Date(t.date)
      const from = startDate ? new Date(startDate) : null
      const to = endDate ? new Date(endDate) : null

      if (from && txDate < from) return false
      if (to && txDate > to) return false
      return true
    })
  }, [transactions, startDate, endDate])

  const income = filteredTransactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const expenses = filteredTransactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const remaining = income - expenses
  const savings = remaining * 0.2

  const summaryData = {
    income,
    expenses,
    remaining,
    savings,
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Container sx={{mt: 4, mb: 4, flex: 1}}>
        {/* Header Card */}
        <Card
          sx={{
            mb: 3,
            p: 2,
            borderRadius: '50px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Dashboard
          </Typography>

          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{shrink: true}}
              size="small"
            />
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{shrink: true}}
              size="small"
            />
          </Box>
        </Card>

        {/* Summary Cards */}
        <Grid
          container
          mb={3}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr', // 1 card per row on mobile
              sm: '1fr 1fr', // 2 cards per row on tablets
              md: 'repeat(4, 1fr)', // 4 equal cards on desktop
            },
            gap: 2, // tighter spacing
          }}
        >
          {[
            {label: 'Total Income', value: summaryData.income},
            {label: 'Total Expenses', value: summaryData.expenses},
            {label: 'Remaining Budget', value: summaryData.remaining},
            {label: 'Savings', value: summaryData.savings},
          ].map((item, index) => (
            <Card
              key={index}
              sx={{borderRadius: '1rem', height: '100%', width: '100%'}}
            >
              <CardContent>
                <Typography variant="subtitle2">{item.label}</Typography>
                <Typography variant="h6">${item.value}</Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Charts */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6}>
            <Line_Chart transactions={filteredTransactions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <PiChart transactions={filteredTransactions} />
          </Grid>
        </Grid>

        {/* Table */}
        <TodaysTable />
      </Container>
    </Box>
  )
}

export default Dashboard

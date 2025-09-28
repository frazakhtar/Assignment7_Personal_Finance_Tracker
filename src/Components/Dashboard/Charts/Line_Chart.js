import {Card, CardContent, Typography} from '@mui/material'
import React, {useMemo} from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const getMonthName = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleString('en-US', {month: 'short'})
}

const Line_Chart = ({transactions}) => {
  const monthlyTrend = useMemo(() => {
    const grouped = transactions.reduce((acc, t) => {
      if (!t.date) return acc
      const month = getMonthName(t.date)
      if (!acc[month]) acc[month] = 0
      if (t.type === 'Expense') {
        acc[month] += Number(t.amount)
      }
      return acc
    }, {})

    return Object.keys(grouped).map((month) => ({
      month,
      amount: grouped[month],
    }))
  }, [transactions])

  return (
    <Card sx={{minWidth: {xs: '300px', md: '560px'}}}>
      <CardContent>
        <Typography variant="subtitle2" mb={2}>
          Monthly Spending Trend
        </Typography>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={monthlyTrend}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default Line_Chart

import {Card, CardContent, Typography} from '@mui/material'
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const Line_Chart = () => {
  const monthlyTrend = [
    {month: 'Jan', amount: 300},
    {month: 'Feb', amount: 500},
    {month: 'Mar', amount: 400},
    {month: 'Apr', amount: 600},
    {month: 'May', amount: 700},
    {month: 'June', amount: 800},
  ]
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

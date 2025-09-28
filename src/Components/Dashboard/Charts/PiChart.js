/*eslint-disable*/
import React, {useMemo} from 'react'
import {Card, CardContent, Typography} from '@mui/material'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const PiChart = ({transactions}) => {
  const data = useMemo(() => {
    const grouped = transactions.reduce((acc, t) => {
      if (t.type === 'Expense') {
        if (!acc[t.category]) acc[t.category] = 0
        acc[t.category] += Number(t.amount)
      }
      return acc
    }, {})

    return Object.keys(grouped).map((category) => ({
      name: category,
      value: grouped[category],
    }))
  }, [transactions])
  if (data.length === 0) {
    return <p>No expense data available for selected period.</p>
  }

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#9C27B0',
    '#FF5722',
    '#4CAF50',
    '#E91E63',
    '#795548',
    '#607D8B',
  ]
  return (
    <Card sx={{minWidth: {xs: '300px', md: '560px'}}}>
      <CardContent>
        <Typography variant="subtitle2" mb={2}>
          Category-wise Expense Split
        </Typography>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default PiChart

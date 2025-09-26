import React from 'react'
import {Card, CardContent, Typography} from '@mui/material'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const PiChart = () => {
  const categorySplit = [
    {name: 'Food', value: 1200},
    {name: 'Transport', value: 800},
    {name: 'Entertainment', value: 500},
    {name: 'Bills', value: 700},
  ]
  const COLORS = ['#0088FE', '#00C49F', '#ff2857ff', '#42e6ffff']
  return (
    <Card sx={{minWidth: {xs: '300px', md: '500px'}}}>
      <CardContent>
        <Typography variant="subtitle2" mb={2}>
          Category-wise Expense Split
        </Typography>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={categorySplit}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {categorySplit.map((entry, index) => (
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

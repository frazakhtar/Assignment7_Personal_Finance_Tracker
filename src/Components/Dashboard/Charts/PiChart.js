/* eslint-disable */
import React, {useMemo} from 'react'
import {Card, CardContent, Typography, Chip, Box} from '@mui/material'
import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from 'recharts'

const COLORS = [
  '#2E7D32',
  '#81C784',
  '#0288D1',
  '#FFD54F',
  '#F06292',
  '#6A1B9A',
]

const ExpensePieChart = ({transactions}) => {
  const data = useMemo(() => {
    const grouped = transactions.reduce((acc, t) => {
      if (t.type === 'Expense') {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount)
      }
      return acc
    }, {})

    return Object.keys(grouped).map((category) => ({
      name: category,
      value: grouped[category],
    }))
  }, [transactions])

  const renderLabel = ({name, percent}) =>
    `${name} (${(percent * 100).toFixed(0)}%)`

  return (
    <Card sx={{minWidth: {xs: '300px', md: '560px'}}}>
      <CardContent sx={{pb: 1}}>
        {' '}
        <Typography variant="subtitle2" mb={1}>
          Category-wise Expense Split
        </Typography>
        {data.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No expense data available for selected period.
          </Typography>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={340}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  label={renderLabel}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <Box
              mt={1}
              p={1.5}
              sx={{
                backgroundColor: '#F5F5F5',
                borderRadius: 2,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                justifyContent: 'center',
                maxWidth: '600px',
              }}
            >
              {data.map((entry, index) => (
                <Chip
                  key={entry.name}
                  label={entry.name}
                  sx={{
                    backgroundColor: COLORS[index % COLORS.length],
                    color: '#fff',
                    fontWeight: 500,
                  }}
                />
              ))}
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default ExpensePieChart

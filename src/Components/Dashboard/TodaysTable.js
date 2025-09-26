import React from 'react'
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

const TodaysTable = () => {
  const expensesToday = [
    {id: 1, amount: 20, category: 'Food', note: 'Lunch'},
    {id: 2, amount: 50, category: 'Transport', note: 'Taxi'},
    {id: 3, amount: 100, category: 'Bills', note: 'Electricity'},
  ]
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2" mb={2}>
          Today&apos;s Expenses
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Amount ($)</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expensesToday.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default TodaysTable

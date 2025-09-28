import React from 'react'
import {useSelector} from 'react-redux'
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
  const {items: transactions} = useSelector((state) => state.transactions)

  const today = new Date().toLocaleDateString('en-CA')

  console.log('Today', today)

  const expensesToday = transactions.filter(
    (t) => t.type === 'Expense' && t.date === today
  )
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

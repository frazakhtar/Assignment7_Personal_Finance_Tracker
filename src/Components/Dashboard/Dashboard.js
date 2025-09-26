import React, {useState} from 'react'
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from '@mui/material'

import PiChart from './Charts/PiChart'
import Line_Chart from './Charts/Line_Chart'
import TodaysTable from './TodaysTable'

const Dashboard = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // @fz-comment : Sample api data
  const summaryData = {
    income: 5000,
    expenses: 3200,
    remaining: 1800,
    savings: 1000,
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Container sx={{mt: 4, mb: 4, flex: 1}}>
        <Box
          mb={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          flexWrap="wrap"
        >
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{shrink: true}}
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{shrink: true}}
          />
          <Button variant="contained">Filter</Button>
        </Box>
        <Grid
          container
          spacing={3}
          mb={3}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          alignItems="stretch"
        >
          {[
            {label: 'Total Income', value: summaryData.income},
            {label: 'Total Expenses', value: summaryData.expenses},
            {label: 'Remaining Budget', value: summaryData.remaining},
            {label: 'Savings', value: summaryData.savings},
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{height: '100%', minWidth: '300px'}}>
                <CardContent>
                  <Typography variant="subtitle2">{item.label}</Typography>
                  <Typography variant="h6">${item.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid
          container
          spacing={3}
          mb={3}
          sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        >
          <Grid item xs={12} md={6}>
            <Line_Chart />
          </Grid>
          <Grid item xs={12} md={6}>
            <PiChart />
          </Grid>
        </Grid>
        <TodaysTable />
      </Container>
    </Box>
  )
}

export default Dashboard

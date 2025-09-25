import React from 'react'
import Dashboard from './Components/Dashboard/Dashboard'
import Transaction from './Components/Transaction/Transaction'
import Budget from './Components/Budget/Budget'
import Profile from './Components/Profile/Profile'

const routes = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/transaction',
    element: <Transaction />,
  },
  {
    path: '/budget',
    element: <Budget />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
]

export default routes

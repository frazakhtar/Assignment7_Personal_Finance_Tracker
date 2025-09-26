import axios from 'axios'

const api = axios.create({
  baseURL: 'https://68d6b62cc2a1754b426bad43.mockapi.io/Transactions',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getTransactions = () => api.get()

export const addTransaction = (transaction) => api.post('/', transaction)

export const updateTransaction = (id, transaction) =>
  api.put(`/${id}`, transaction)

export const deleteTransaction = (id) => api.delete(`/${id}`)

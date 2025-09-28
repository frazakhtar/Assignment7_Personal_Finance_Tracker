import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from '../api/transactions'

// Async thunks
export const fetchTransactions = createAsyncThunk(
  'transactions/fetch',
  async () => {
    const res = await getTransactions()
    return res.data
  }
)

export const createTransaction = createAsyncThunk(
  'transactions/create',
  async (data) => {
    const res = await addTransaction(data)
    return res.data
  }
)

export const editTransaction = createAsyncThunk(
  'transactions/edit',
  async ({id, data}) => {
    const res = await updateTransaction(id, data)
    return res.data
  }
)

export const removeTransaction = createAsyncThunk(
  'transactions/remove',
  async (id) => {
    await deleteTransaction(id)
    return id
  }
)

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.items = state.items.map((t) =>
          t.id === action.payload.id ? action.payload : t
        )
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload)
      })
  },
})

export default transactionsSlice.reducer

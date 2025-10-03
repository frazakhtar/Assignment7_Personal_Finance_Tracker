import {createSlice} from '@reduxjs/toolkit'

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem('budgets')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const saveToStorage = (budgets) => {
  localStorage.setItem('budgets', JSON.stringify(budgets))
}

const budgetSlice = createSlice({
  name: 'budgets',
  initialState: {
    items: loadFromStorage(),
  },
  reducers: {
    addBudget: (state, action) => {
      state.items.push(action.payload)
      saveToStorage(state.items)
    },
    updateBudget: (state, action) => {
      const idx = state.items.findIndex(
        (b) => b.category === action.payload.category
      )
      if (idx !== -1) {
        state.items[idx] = action.payload
        saveToStorage(state.items)
      }
    },
  },
})

export const {addBudget, updateBudget} = budgetSlice.actions
export default budgetSlice.reducer

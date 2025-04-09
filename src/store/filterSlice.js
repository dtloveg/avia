import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filters: {
    all: true,
    without: true,
    one: true,
    two: true,
    three: true,
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleFilter: (state, action) => {
      const filterName = action.payload

      if (filterName === 'all') {
        if (!state.filters.all) {
          state.filters.all = true
          state.filters.without = true
          state.filters.one = true
          state.filters.two = true
          state.filters.three = true
        } else {
          state.filters.all = false
          state.filters.without = false
          state.filters.one = false
          state.filters.two = false
          state.filters.three = false
        }
      } else {
        state.filters[filterName] = !state.filters[filterName]
        if (state.filters[filterName] === false) {
          state.filters.all = false
        }
        if (state.filters.without && state.filters.one && state.filters.two && state.filters.three) {
          state.filters.all = true
        }
      }
    },
  },
})

export const { toggleFilter } = filterSlice.actions
export default filterSlice.reducer

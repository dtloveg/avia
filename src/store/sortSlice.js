import { createSlice } from '@reduxjs/toolkit'

const sortSlice = createSlice({
  name: 'sort',
  initialState: {
    sort: 'cheap',
  },
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload
    },
  },
})

export const { setSort } = sortSlice.actions
export default sortSlice.reducer

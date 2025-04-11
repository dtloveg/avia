import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'

const baseUrl = 'https://aviasales-test-api.kata.academy'

const fetchTicketsRecursive = async (searchId, dispatch) => {
  const MAX_RETRIES = 7
  let attempts = 0

  const fetchTickets = async () => {
    try {
      const ticketsResponse = await fetch(`${baseUrl}/tickets?searchId=${searchId}`)

      if (!ticketsResponse.ok) {
        console.error('Ошибка при получении билетов:', ticketsResponse.statusText)
        attempts++
        if (attempts < MAX_RETRIES) {
          setTimeout(fetchTickets, 1000)
        } else {
          console.error('Достигнуто максимальное количество попыток')
        }
      } else {
        const ticketsData = await ticketsResponse.json()
        dispatch(addTickets(ticketsData.tickets))

        if (!ticketsData.stop) {
          fetchTicketsRecursive(searchId, dispatch)
        } else {
          dispatch(setLoading(false))
        }
      }
    } catch (error) {
      console.error('Произошла ошибка:', error)
      attempts++
      if (attempts < MAX_RETRIES) {
        setTimeout(fetchTickets, 1000)
      } else {
        console.error('Достигнуто максимальное количество попыток')
      }
    }
  }

  fetchTickets()
}

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { dispatch }) => {
  const searchResponse = await fetch(`${baseUrl}/search`)
  const searchData = await searchResponse.json()

  fetchTicketsRecursive(searchData.searchId, dispatch)
})

const initialState = {
  tickets: [],
  status: null,
  error: null,
  searchId: null,
  isLoading: true,
}

export const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTickets: (state, action) => {
      state.tickets.push(...action.payload)
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.isLoading = true
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.searchId = action.payload.searchId
        state.tickets = action.payload.tickets
        state.isLoading = false
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message
        state.isLoading = false
      })
  },
})

export const selectTickets = (state) => state.tickets.tickets
export const selectSort = (state) => state.sort.sort
export const selectFilters = (state) => state.filter.filters

export const selectFilteredTickets = createSelector(
  [selectTickets, selectSort, selectFilters],
  (tickets, sort, filters) => {
    const { all, without, one, two, three } = filters

    const noFiltersSelected = !without && !one && !two && !three

    if (noFiltersSelected) {
      return []
    }

    const sortedTickets =
      all || (!without && !one && !two && !three)
        ? [...tickets]
        : tickets.filter((ticket) => {
            const stopCounts = ticket.segments.map((segment) => segment.stops.length)

            if (without && stopCounts.every((count) => count === 0)) return true
            if (one && stopCounts.some((count) => count === 1)) return true
            if (two && stopCounts.some((count) => count === 2)) return true
            if (three && stopCounts.some((count) => count === 3)) return true

            return false
          })

    if (sort === 'cheap') {
      return sortedTickets.sort((a, b) => a.price - b.price)
    } else if (sort === 'fast') {
      return sortedTickets.sort((a, b) => {
        const aDuration = a.segments.reduce((total, segment) => total + segment.duration, 0)
        const bDuration = b.segments.reduce((total, segment) => total + segment.duration, 0)
        return aDuration - bDuration
      })
    } else if (sort === 'optimum') {
      return sortedTickets.sort((a, b) => {
        const aDuration = a.segments.reduce((total, segment) => total + segment.duration, 0)
        const bDuration = b.segments.reduce((total, segment) => total + segment.duration, 0)
        const priceDiff = a.price - b.price
        return priceDiff !== 0 ? priceDiff : aDuration - bDuration
      })
    }

    return sortedTickets
  }
)

export default ticketSlice.reducer
export const { addTickets } = ticketSlice.actions
export const { setLoading } = ticketSlice.actions

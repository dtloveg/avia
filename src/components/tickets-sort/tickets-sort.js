import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setSort } from '../../store/sortSlice'

import classes from './tickets-sort.module.scss'

const TicketsSort = () => {
  const dispatch = useDispatch()
  const sort = useSelector((state) => state.sort.sort)
  return (
    <ul className={classes.sorted}>
      <li>
        <button
          className={`${classes.sorted_button} ${classes.sorted_button__first} ${sort === 'cheap' ? classes.selected : ''}`}
          onClick={() => dispatch(setSort('cheap'))}
        >
          САМЫЙ ДЕШЁВЫЙ
        </button>
      </li>
      <li>
        <button
          className={`${classes.sorted_button} ${sort === 'fast' ? classes.selected : ''}`}
          onClick={() => dispatch(setSort('fast'))}
        >
          САМЫЙ БЫСТРЫЙ
        </button>
      </li>
      <li>
        <button
          className={`${classes.sorted_button} ${classes.sorted_button__last} ${sort === 'optimum' ? classes.selected : ''}`}
          onClick={() => dispatch(setSort('optimum'))}
        >
          ОПТИМАЛЬНЫЙ
        </button>
      </li>
    </ul>
  )
}

export default TicketsSort

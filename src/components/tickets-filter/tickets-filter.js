import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toggleFilter } from '../../store/filterSlice'

import classes from './tickets-filter.module.scss'

const TicketsFilter = () => {
  const [isVisible, setIsVisible] = useState(false)
  const dispatch = useDispatch()

  const filters = useSelector((state) => state.filter.filters)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <aside>
      <form>
        <fieldset className={classes.transfers}>
          <button type="button" className={classes.transfers_button} onClick={toggleVisibility}>
            Кол-во пересадок
          </button>
          <legend className={classes.transfers_legend}>КОЛИЧЕСТВО ПЕРЕСАДОК</legend>
          <ul className={`${classes.transfers_list} ${isVisible ? classes.visible : ''}`}>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="all_transfers"
                  checked={filters.all}
                  onChange={() => dispatch(toggleFilter('all'))}
                />{' '}
                Все
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="without_transfers"
                  checked={filters.without}
                  onChange={() => dispatch(toggleFilter('without'))}
                />{' '}
                Без пересадок
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="1_transfer"
                  checked={filters.one}
                  onChange={() => dispatch(toggleFilter('one'))}
                />{' '}
                1 пересадка
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="2_transfers"
                  checked={filters.two}
                  onChange={() => dispatch(toggleFilter('two'))}
                />{' '}
                2 пересадки
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="3_transfers"
                  checked={filters.three}
                  onChange={() => dispatch(toggleFilter('three'))}
                />{' '}
                3 пересадки
              </label>
            </li>
          </ul>
        </fieldset>
      </form>
    </aside>
  )
}

export default TicketsFilter

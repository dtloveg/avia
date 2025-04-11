import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import TicketsSort from '../tickets-sort'
import Ticket from '../ticket'
import { fetchTickets, selectFilteredTickets } from '../../store/ticketSlice'

import classes from './ticket-list.module.scss'

const TicketsList = () => {
  const [visibleTickets, setVisibleTickets] = useState(5)
  const tickets = useSelector(selectFilteredTickets)
  const status = useSelector((state) => state.tickets.status)
  const isLoading = useSelector((state) => state.tickets.isLoading)

  const dispatch = useDispatch()
  const loadMoreTickets = () => {
    setVisibleTickets((prev) => prev + 5)
  }
  useEffect(() => {
    if (tickets.length === 0 && status !== 'loading') {
      const loadTickets = async () => {
        try {
          await dispatch(fetchTickets())
        } catch (error) {
          console.error('Ошибка при получении билетов:', error)
        }
      }
      loadTickets()
    }
  }, [dispatch, tickets.length, status])

  return (
    <>
      <div className={classes['tickets-list']}>
        <TicketsSort />
        {isLoading && <span className={classes.loader}></span>}
        {tickets.length > 0
          ? tickets.slice(0, visibleTickets).map((ticket) => <Ticket ticket={ticket} key={uuidv4()} />)
          : status !== 'loading' && <p>Подходящие билеты не найдены</p>}
        {visibleTickets < tickets.length && (
          <button className={classes['tickets-list_btn-show-more']} onClick={loadMoreTickets}>
            Показать еще 5 билетов
          </button>
        )}
      </div>
    </>
  )
}

export default TicketsList

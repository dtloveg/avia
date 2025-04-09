import React from 'react'
import { format, parseISO, add } from 'date-fns'
import propTypes from 'prop-types'

import classes from './ticket.module.scss'

const Ticket = ({ ticket }) => {
  const { price, carrier, segments } = ticket
  const getDate = (date) => parseISO(date)
  return (
    <article className={classes['ticket-card']}>
      <div className={classes['ticket-card_header']}>
        <span>{price} Р</span>
        <img src={`//pics.avs.io/99/36/${carrier}.png`} alt={carrier}></img>
      </div>
      <div className={classes['ticket-card_body']}>
        {segments.map((segment, index) => (
          <div key={index} className={classes['ticket-card_main-info']}>
            <div className={classes['ticket-card_info']}>
              <span className={classes['ticket-card_info-header']}>
                {segment.origin} - {segment.destination}
              </span>
              <span>
                {getDate(segment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                {format(
                  add(getDate(segment.date), {
                    hours: Math.floor(segment.duration / 60),
                    minutes: segment.duration % 60,
                  }),
                  'HH:mm'
                )}
              </span>
            </div>
            <div className={classes['ticket-card_info']}>
              <span className={classes['ticket-card_info-header']}>В ПУТИ</span>
              <span>
                {Math.floor(segment.duration / 60)}ч {segment.duration % 60}мин
              </span>
            </div>
            <div className={classes['ticket-card_info']}>
              <span className={classes['ticket-card_info-header']}>
                {segment.stops.length === 0 && '0 ПЕРЕСАДОК'}
                {segment.stops.length === 1 && `${segment.stops.length} ПЕРЕСАДКА`}
                {segment.stops.length > 1 && segment.stops.length <= 3 && `${segment.stops.length} ПЕРЕСАДКИ`}
                {segment.stops.length > 3 && `${segment.stops.length} ПЕРЕСАДОК`}
              </span>
              <span>{segment.stops.length > 0 ? segment.stops.join(', ') : 'Прямой рейс'}</span>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
Ticket.propTypes = {
  ticket: propTypes.shape({
    price: propTypes.number.isRequired,
    carrier: propTypes.string.isRequired,
    segments: propTypes.array.isRequired,
  }).isRequired,
}

export default Ticket

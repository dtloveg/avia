import React from 'react'

import TicketsList from '../ticket-list'
import TicketsFilter from '../tickets-filter'

import classes from './app.module.scss'
import logo from './logo.svg'

function App() {
  return (
    <>
      <img className={classes.logo} src={logo}></img>
      <main className={classes.main}>
        <TicketsFilter />
        <TicketsList />
      </main>
    </>
  )
}

export default App

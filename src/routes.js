import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './compoments/Home'
import Contact from './compoments/Contact'

export default () => {
  return (
      <BrowserRouter>
        <Route component={Home} path="/" exact></Route>
        <Route component={Contact} path="/create" exact></Route>
        <Route component={Contact} path="/:id" exact></Route>
        <Route component={Contact} path="/:id/:mode" exact></Route>
      </BrowserRouter>
  )  
} 
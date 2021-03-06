import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './compoments/Home'
import Contact from './compoments/Contact'

export default () => {
  return (
      <BrowserRouter>
        <Route component={Home} path="/" exact></Route>
        <Route component={() => (<Contact isCreate></Contact>)} path="/contact" exact></Route>
        <Route component={() => (<Contact isShow></Contact>)} path="/contact/:id" exact></Route>
        <Route component={() => (<Contact isEdit></Contact>)} path="/contact/:id/:mode" exact></Route>
      </BrowserRouter>
  )  
} 
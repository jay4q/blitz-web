import React from 'react'
import ReactDOM from 'react-dom'
import 'nprogress/nprogress.css'
import './styles/global.css'
import { App } from './pages'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

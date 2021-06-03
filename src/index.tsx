import React from 'react'
import ReactDOM from 'react-dom'
import 'nprogress/nprogress.css'
import './styles/global.css'
import { App } from './pages'

if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_VCONSOLE === 'true') {
  import('vconsole').then(VConsole => new VConsole.default())
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

import { FunctionComponent } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { history } from 'utils/history'
import { HomePage } from './home'

export const App: FunctionComponent = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={HomePage} />
      </Switch>
    </Router>
  )
}
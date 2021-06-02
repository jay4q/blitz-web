import { FunctionComponent, Suspense, useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { history } from 'utils/history'
import HomePage from './home'
import { PATHS } from 'configs/path'
import NProgress from 'nprogress'

const __ROUTE__ = [
  { path: PATHS['home'], comp: HomePage },  // 首页不需要懒加载
  // !!! page
]

const Loading = () => {
  useEffect(() => {
    NProgress.start()
    return () => {
      NProgress.done()
    }
  }, [])
  return null
}

export const App: FunctionComponent = () => {
  return (
    <Router history={history}>
      <Suspense fallback={Loading}>
        <Switch>
          {
            __ROUTE__.map(r => (
              <Route
                exact
                key={r.path}
                path={r.path}
                component={r.comp}
              />
            ))
          }
        </Switch>
      </Suspense>
    </Router>
  )
}
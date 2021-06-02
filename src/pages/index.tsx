import { FunctionComponent, Suspense, useEffect, lazy } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { history } from 'utils/history'
import HomePage from './home'
import { PATHS } from 'configs/path'
import NProgress from 'nprogress'

const __ROUTE__ = [
  { path: PATHS.home, comp: HomePage },  // 首页不需要懒加载
  // !!! page
  { path: PATHS['dev__blur'], comp: lazy(() => import('../pages/dev/blur')) },
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
          <Route render={() => <Redirect to={PATHS.home} />} />
        </Switch>
      </Suspense>
    </Router>
  )
}
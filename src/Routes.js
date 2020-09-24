import * as React from 'react'
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom'
import './App.css'
import MainFrame from './components/Layout/MainFrame'
import TaskPage from './pages/TaskPage'

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <MainFrame>
          <Switch>
              <Route exact path='/' component={TaskPage} />
              <Redirect to='/' />
          </Switch>
        </MainFrame>
      </Router>
    )
  }
}

export default Routes
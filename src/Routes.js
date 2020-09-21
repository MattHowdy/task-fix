import * as React from 'react'
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom'
import './App.css'
import TaskPage from './pages/TaskPage'

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
            <Route exact path='/' component={TaskPage} />
            <Redirect to='/' />
        </Switch>
      </Router>
    )
  }
}

export default Routes
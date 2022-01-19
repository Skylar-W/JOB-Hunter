import React, {Component} from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'
import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'
// import './index.css';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route path='/login' component={Login}></Route>
              <Route path='/register' component={Register}></Route>
              <Route path='/' component={Home}></Route>
            </Switch>
          </Router>
        </Provider>
      </div>
    )
  }
};
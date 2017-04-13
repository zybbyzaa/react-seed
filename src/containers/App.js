/**
 * @namespace Container
 */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LazyRoute from 'lazy-route';

import 'assets/scss/app.scss';

/**
 * App页面组件
 *
 * @export
 * @class App
 * @extends {Component}
 * @memberOf Container
 */
export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-wrapper">
          <Route exact path={'/'}
            render={props => <Redirect to={'/home'} />}
          />
          <Route
            exact path={'/home'}
            render={props => <LazyRoute {...props} component={import('./Home') } />}
          />
        </div>
      </Router>
    );
  }
}

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import components/containers
import Home from '../containers/Home';
import Career from '../containers/Career';
import NotFound from './NotFound';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/career/:slug/:careerSaved" component={Career} />
          <Route path="/career/:slug" exact component={Career} />
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
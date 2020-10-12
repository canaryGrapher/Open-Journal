import React, { Component } from 'react';
import Home from './Home';
import Newpost from './Newpost';
import Edit from './Edit';
import Allpost from './Allposts';
import View from './View';
import Search from './Search';
import { BrowserRouter as Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/allposts" component={Allpost} />
        <Route exact path="/new" component={Newpost} />
        <Route path="/edit/post" component={Edit} />
        <Route path="/post" component={View} />
        <Route path="/search" component={Search} />
      </Switch>
    );
  }
}

export default App;

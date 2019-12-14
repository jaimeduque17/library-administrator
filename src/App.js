import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import EditSubscriber from './components/subscribers/EditSubscriber';
import NewSubscriber from './components/subscribers/NewSubscriber';
import ShowSubscriber from './components/subscribers/ShowSubscriber';
import Subscribers from './components/subscribers/Subscribers';

import Navbar from './components/layout/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/subscribers" component={Subscribers} />
          <Route exact path="/subscribers/new" component={NewSubscriber} />
          <Route exact path="/subscribers/show/:id" component={ShowSubscriber} />
          <Route exact path="/subscribers/edit/:id" component={EditSubscriber} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

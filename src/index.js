import React from 'react';
import ReactDOM from 'react-dom';

import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Navigation from './components/navbar';
import IndexPage from './pages/index';
import ViewPage from './pages/view';
import YearPage from './pages/year';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Navigation/>
        <Switch>
          <Route path="/view/:id" component={ViewPage} />
          <Route path="/year/:year" component={YearPage} />
          <Route path="/" component={IndexPage} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

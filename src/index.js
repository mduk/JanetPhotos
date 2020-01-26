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
import ArchivePage from './pages/archive';

import 'semantic-ui-css/semantic.min.css'

class App extends React.Component {

  render() {
    return (
      <Router>
        <Navigation/>
        <Switch>
          <Route path="/view/:id" component={ViewPage} />
          <Route path="/archive/:year/:month?" component={ArchivePage} />
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

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loguin from './pages/Loguin';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={ Loguin }
          />
          <Route
            exact
            path="/search"
            component={ Search }
          />
          <Route
            exact
            path="/album/:id"
            render={ () => <Album /> }
          />
          <Route
            exact
            path="/favorites"
            component={ Favorites }
          />
          <Route
            exact
            path="/profile"
            component={ Profile }
          />
          <Route
            exact
            path="/profile/edit"
            component={ ProfileEdit }
          />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

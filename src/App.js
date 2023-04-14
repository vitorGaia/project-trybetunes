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
            path="/project-trybetunes"
            component={ Loguin }
          />
          <Route
            exact
            path="/project-trybetunes/search"
            component={ Search }
          />
          <Route
            exact
            path="/project-trybetunes/album/:id"
            render={ (props) => (<Album
              { ...props }
            />) }
          />
          <Route
            exact
            path="/project-trybetunes/favorites"
            component={ Favorites }
          />
          <Route
            exact
            path="/project-trybetunes/profile"
            component={ Profile }
          />
          <Route
            exact
            path="/project-trybetunes/profile/edit"
            component={ ProfileEdit }
          />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import MovieContextProvider from './context/MovieContext';
import './utility.css'
import AuthContextProvider from './context/AuthContext';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import PrivateRoute from './components/pages/PrivateRoute'
import EmptyComponent from './components/EmptyComponent';

function App() {

  React.useEffect(() => {
    M.AutoInit();
  }, [])

  return (
    <AuthContextProvider>
    <MovieContextProvider>
    <BrowserRouter>
      <div>
        <EmptyComponent />
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          {/* <Route exact path='/' component={Home} /> */}
          <Route exact path='/reg' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
    </MovieContextProvider>
    </AuthContextProvider>
  );
}

export default App;

import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Routing
import PrivateRoute from './components/routing/PrivateRoute';

//screens
import PrivateScreen from './components/screens/PrivateScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute path="/home" component={PrivateScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,Route
} from "react-router-dom";
import ResponsiveDrawer from './layout';
import Login from './pages/Login'
function Routing() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login}/>
        <ResponsiveDrawer />
      </Switch>
    </Router>
  );
}

export default Routing;

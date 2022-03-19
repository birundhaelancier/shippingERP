import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import ResponsiveDrawer from './layout';

function Routing() {
  return (
    <Router>
      <Switch>
        <ResponsiveDrawer />
      </Switch>
    </Router>
  );
}

export default Routing;

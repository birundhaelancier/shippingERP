import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,Route
} from "react-router-dom";
import ResponsiveDrawer from './layout';
import Login from './pages/Login/index'
import { HashRouter } from 'react-router-dom';
function Routing() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Login}/>
        <ResponsiveDrawer />
      </Switch>
    </HashRouter>
  );
}

export default Routing;

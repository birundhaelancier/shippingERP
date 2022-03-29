import logo from './logo.svg';
import './App.css';
import ResponsiveDrawer from './layout';
import Route from './route';
import Login from './pages/Login'
import 'font-awesome/css/font-awesome.min.css';
import ThemeConfig from './theme';
import './CommonStyle.scss'
function App() {
  return (
    <ThemeConfig>
    <Route/>
    </ThemeConfig>
  );
}

export default App;

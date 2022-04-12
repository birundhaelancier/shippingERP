import react, { useEffect } from 'react';
import './App.css';
import Route from './route';
import Login from './pages/Login'
import 'font-awesome/css/font-awesome.min.css';
import ThemeConfig from './theme';
import './CommonStyle.scss'
function App() {

  return (
    <ThemeConfig>
      <Route />
    </ThemeConfig>
  );
}

export default App;

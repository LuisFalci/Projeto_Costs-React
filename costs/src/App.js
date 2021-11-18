import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Container from './components/layout/Container';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import NewProject from './components/pages/NewProject';

function App() {
  return (
    <Router>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contact">Contato</Link></li>
        <li><Link to="/company">Company</Link></li>
        <li><Link to="/newproject">NewProject</Link></li>
      </ul>
      <Switch>
        <Container customClass="min-height">
          <Route exact path="/"><Home /></Route>
          <Route exact path="/company"><Company /></Route>
          <Route exact path="/contact"><Contact /></Route>
          <Route exact path="/newproject"><NewProject /></Route>
        </Container>
      </Switch>
      <p>Footer</p>
    </Router>
  )
}

export default App;

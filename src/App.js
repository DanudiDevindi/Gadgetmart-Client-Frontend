import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './views/Home';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AboutUs from './views/AboutUs';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" name="Home Page" component={Home} />
          <Route exact path="/aboutUs" name="About Us" component={AboutUs} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;





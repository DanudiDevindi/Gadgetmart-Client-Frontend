import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './views/Home';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AboutUs from './views/AboutUs';
import Product from './views/Product';
import WishList from "./views/WishList";


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" name="Home Page" component={Home} />
          <Route exact path="/aboutUs" name="About Us" component={AboutUs} />
          <Route exact path="/product" name="Product" component={Product} />
          <Route exact path="/wishList" name="Wish List" component={WishList}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;





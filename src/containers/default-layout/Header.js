import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';

class Header extends Component {

    removeProduct = (item) => {
        let cart = JSON.parse(Cookies.get('CartItems'));
        let cart2 = [];
        cart.map(i => {
            if (i.id !== item.id) {
                cart2.push(i);
            }
        });
        Cookies.set('CartItems',JSON.stringify(cart2));
        this.setState({
            loading: true
        });
    };

    render() {

        let cart = Cookies.get('CartItems');
        if (cart === undefined) {
            cart = [];
        } else {
            cart = JSON.parse(cart);
            cart = cart.map(item => {
                let price = item.price;
                if (item.discount !== null && item.discount !== 0) {
                    price = (item.price - (item.price / 100 * item.discount));
                }
                return {
                    ...item,
                    price: price
                }
            });
        }
        let total = 0;



        return (
            <div>
                <header className="header mb-0">
                    <div className="header-middle">
                        <div className="container">
                            <div className="header-left">
                                <button className="mobile-menu-toggler mr-2" type="button">
                                    <i className="icon-menu"></i>
                                </button>
                                <a  onClick={()=>this.props.history.push('/')} className="logo">
                                    <img
                                        src={require("../../assets/assets/images/favicon.png")}
                                        alt="Porto Logo"
                                        style={{height: 130 }}
                                    />
                                </a>
                            </div>
                            <div className="header-center flex-1 ml-0 justify-content-end justify-content-lg-start">
                                <div
                                    className="header-search header-search-inline header-search-category w-lg-max pr-2 pr-lg-0">
                                    {/*<a*/}
                                        {/*href="#"*/}
                                        {/*className="search-toggle header-icon d-none d-sm-inline-block d-lg-none mr-0"*/}
                                        {/*role="button"*/}
                                    {/*>*/}
                                        {/*<i className="icon-search-3"></i>*/}
                                    {/*</a>*/}
                                    {/*<form action="#" method="get">*/}
                                        {/*<div className="header-search-wrapper">*/}
                                            {/*<input*/}
                                                {/*type="search"*/}
                                                {/*className="form-control"*/}
                                                {/*name="q"*/}
                                                {/*id="q"*/}
                                                {/*placeholder="Search..."*/}
                                                {/*required=""*/}
                                            {/*/>*/}
                                            {/*<div className="select-custom">*/}
                                                {/*<select id="cat" name="cat">*/}
                                                    {/*<option value="">All Categories</option>*/}
                                                    {/*{*/}
                                                        {/*this.state.categories.map((item, index) => (*/}
                                                            {/*<option key={index} value={item.id}>{item.name}</option>*/}
                                                        {/*))*/}
                                                    {/*}*/}
                                                {/*</select>*/}
                                            {/*</div>*/}
                                            {/*<button*/}
                                                {/*className="btn icon-search-3"*/}
                                                {/*type="submit"*/}
                                            {/*></button>*/}
                                        {/*</div>*/}
                                    {/*</form>*/}
                                </div>
                            </div>
                            <div className="header-right">
                                <div className="header-contact d-none d-lg-flex ml-5">
                                    <i className="icon-phone-2"></i>
                                    <h6>
                                        Call us 
                                        <a href="tel:" className="font1 text-secondary">
                                            (011) 111 1112
                                        </a>
                                    </h6>
                                </div>

                                <a  className="header-icon"
                                style={{color: 'white'}}
                                onClick={()=>this.props.history.push('./user')}
                                >
                                    <i className="icon-user-2"></i>
                                </a>

                                {/*<a href="/wishList" className="header-icon">*/}
                                    {/*<i className="icon-wishlist-2"></i>*/}
                                {/*</a>*/}

                                <div className="dropdown cart-dropdown">
                                    <a
                                        href="#"
                                        className="dropdown-toggle dropdown-arrow"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        data-display="static"
                                    >
                                        <i className="icon-shopping-cart"></i>
                                        <span className="cart-count badge-circle">{cart.length}</span>
                                    </a>

                                    <div className="dropdown-menu">
                                        <div className="dropdownmenu-wrapper">
                                            <div className="dropdown-cart-header">
                                                <span>{cart.length} Items</span>

                                                <a onClick={()=>this.props.history.push('/cart')} className="goCart float-right">
                                                    View Cart
                                                </a>
                                            </div>

                                            <div className="dropdown-cart-products">

                                                {
                                                    cart.map((item, index) => {
                                                        total += item.price;
                                                        return (
                                                            <div className="product" key={index}>
                                                                <div className="product-details">
                                                                    <h4 className="product-title">
                                                                        <a onClick={() => this.props.history.push('/product', {item: item})}>
                                                                            {item.name}</a>
                                                                    </h4>

                                                                    <span className="cart-product-info">
                                                                      <span
                                                                          className="cart-product-qty">{item.qty}</span>x
                                                                        Rs.{item.price.toFixed(2)}
                                                                    </span>
                                                                </div>

                                                                <figure className="product-image-container">
                                                                    <a onClick={() => this.props.history.push('/product', {item: item})}
                                                                       className="product-image">
                                                                        <img
                                                                            src={item.image}
                                                                            alt="product"
                                                                            width="80"
                                                                            height="80"
                                                                        />
                                                                    </a>
                                                                    <a
                                                                        onClick={()=>this.removeProduct(item)}
                                                                        className="btn-remove icon-cancel"
                                                                        title="Remove Product"
                                                                    />
                                                                </figure>
                                                            </div>
                                                        )
                                                    })
                                                }


                                                <div className="dropdown-cart-total">
                                                    <span>Total</span>

                                                    <span className="cart-total-price float-right">
                                                        Rs. {total.toFixed(2)}
                                                </span>
                                                </div>

                                                <div className="dropdown-cart-action">
                                                    <a
                                                        style={{color: 'white'}}
                                                        onClick={()=>this.props.history.push('./Checkout')}
                                                        className="btn btn-primary btn-block"
                                                    >
                                                        Checkout
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="header-bottom mb-lg-2 sticky-header"
                            data-sticky-options="{
                                'move': [
                                    {
                                        'item': '.header-icon:not(.search-toggle)',
                                        'position': 'end',
                                        'clone': false
                                    },
                                    {
                                        'item': '.cart-dropdown',
                                        'position': 'end',
                                        'clone': false
                                    }
                                ],
                                'moveTo': '.container',
                                'changes': [
                                    {
                                        'item': '.logo-white',
                                        'removeclassName': 'd-none'
                                    },
                                    {
                                        'item': '.header-icon:not(.search-toggle)',
                                        'removeclassName': 'pb-md-1',
                                        'addclassName': 'text-white'
                                    },
                                    {
                                        'item': '.cart-dropdown',
                                        'addclassName': 'text-white'
                                    }
                                ]
                            }"
                        >
                            <div className="container">
                                <div className="logo logo-transition logo-white w-100 d-none">
                                    <a onClick={()=>this.props.history.push('/')}>
                                        <img
                                            src={require("../../assets/assets/images/favicon.png")}
                                            alt="Porto Logo"
                                            width="110"
                                            height="46"
                                        />
                                    </a>
                                </div>
                                <div className="w-100" style={{backgroundColor: "darkblue"}}>
                                    <nav className="main-nav">
                                        <ul className="menu d-flex justify-content-center">
                                            <li className="active">
                                                <Link to={`/`} style={{color: "yellow"}}>Home</Link>
                                            </li>

                                            {/*<li>*/}
                                                {/*<a href="$">Blog</a>*/}
                                            {/*</li>*/}

                                            <li>
                                                <Link to={`/aboutUs`} style={{color: "white"}}>About Us</Link>
                                            </li>
                                            {/* <a path="/aboutUs">About Us</a></li> */}
                                            <li>
                                                <Link to={`/contactUs`} style={{color: "white"}}>Contact Us</Link>
                                            </li>
                                            {/* <li className="m-0"><a className="px-4" href="https://1.envato.market/DdLk5" target="_blank">Buy Porto!</a></li> */}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
        
    }
}

export default Header;
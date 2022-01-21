import React, {Component} from 'react';
import Footer from '../containers/default-layout/Footer';
import Headers from '../containers/default-layout/Header';
import slider1 from '../assets/assets/images/slider/slider_1.jpg'

import axios from 'axios';

import Cookies from 'js-cookie';
import * as xml2js from "xml2js";
import {BASE_URL} from "../const/const";
import Pagination from '@material-ui/lab/Pagination';

export default class Home extends Component {
    state = {
        categories: [],
        items: [],
        selectedItem: 'All Items',
        selectedBrand: 'All Brands',
        loading: false,
        page: 1,
        search: ''
    };

    getSubCatItems = (item) => {
        this.setState({
            selectedItem: item.name
        });
    };
    getBrands = (item) => {
        this.setState({
            selectedBrand: item
        });
    };
    getAllItems = () => {
        const body =
            '<?xml version="1.0" encoding="utf-8"?>' +
            '<soapenv:Envelope ' +
            'xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
            'xmlns:sch="http://localhost:8080/xml/items"> ' +
            '<soapenv:Header/> ' +
            '<soapenv:Body> ' +
            '<sch:ItemDetailsRequest> ' +
            '<sch:name>Sajal</sch:name> ' +
            '<sch:id>Sajal</sch:id> ' +
            '<sch:shop>Sajal</sch:shop> ' +
            '</sch:ItemDetailsRequest> ' +
            '</soapenv:Body> ' +
            '</soapenv:Envelope> ';

        axios.post(BASE_URL + '/service/item-details', body, {
            headers: {
                'Content-Type': 'text/xml',
            }
        })
            .then(res => {
                let parser = new xml2js.Parser();
                let items = [];
                parser.parseString(res.data,
                    function (err, result) {
                        items = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns3:ItemDetailsResponse'][0]['ns3:Items'];
                        items = items.map(item => {
                            return {
                                id: item.id[0],
                                name: item.name[0],
                                description: item.description[0],
                                image: item.image[0],
                                price: Number(item.price[0]),
                                deliveryCost: Number(item.deliveryCost[0]),
                                brand: item.brand[0],
                                category: item.category[0],
                                discount: Number(item.discount[0]),
                                shop: item.shop[0],
                                soldOut: item.soldOut[0] === 'true',
                                warranty: item.warranty[0],
                            }
                        })
                    }
                );
                this.setState({
                    items: items
                })
            })
            .catch(err => {
                console.log(err)
            });
        this.setState({
            loading: false
        });
    };
    

    render() {
        let items = [],brands = [];
        this.state.categories.map(item => {
            if (this.state.selectedItem === item.name){
                brands = item.brands;
            }
        })
        this.state.items.map(item => {
            let search = item.name.toLowerCase().startsWith(this.state.search) || item.name.toLowerCase().includes(this.state.search);

            if (this.state.selectedItem === 'All Items') {
                if (this.state.search === '') {
                    items.push(item);
                } else {
                    if (search) {
                        items.push(item);
                    }
                }
            } else {
                if (item.category === this.state.selectedItem) {
                    if (this.state.selectedBrand === 'All Brands'){
                        if (this.state.search === '') {
                            items.push(item);
                        } else {
                            if (search) {
                                items.push(item);
                            }
                        }
                    } else {
                        if (item.brand === this.state.selectedBrand){
                            if (this.state.search === '') {
                                items.push(item);
                            } else {
                                if (search) {
                                    items.push(item);
                                }
                            }
                        }
                    }
                }
            }
        })
        let pages = Math.ceil(items.length / 8);
        let data = items.slice((this.state.page - 1) * 8, this.state.page * 8);
        let brandAvailable = brands.length > 0;
        let itemStyle = brandAvailable ? "col-lg-9 col-md-9 m-t-6" : "col-lg-12 col-md-12 m-t-6";
        return (
            <div>
                <Headers history={this.props.history}/>
                <main className="main">

                    <div className="container mb-6">

                        <div className="marginTop banner ">
                            <img className="owl-lazy slide-bg"
                                 src={'https://blog.saginfotech.com/wp-content/uploads/2018/12/gst-rate-slash.jpg'}
                                 data-src={slider1} alt="banner"
                                 width="1120" height="445"/>
                            <div className="banner-layer slide-1 banner-layer-left banner-layer-middle text-right">
                                <h4 className="m-b-3 text-right ">Luxury With Brands We Love</h4>
                                <h3 className="m-b-2 font3 text-right text-primary "
                                    data-animation-name="blurIn" data-animation-duration="1200">Exclusive Products</h3>

                                <h4 className="m-b-3 text-right " data-animation-delay="700">Now at stock</h4>

                                {/*<div className="mb-0 " data-animation-delay="2400"*/}
                                {/*     data-animation-name="fadeInUpShorter">*/}
                                {/*    <a href="#items">*/}
                                {/*        <button className="btn btn-modern btn-lg btn-dark homeBtn">Shop Now!</button>*/}
                                {/*    </a>*/}
                                {/*</div>*/}
                            </div>
                        </div>


                        <section className="p-t-3 mt-3">
                            <h2 className="section-title ls-n-20 m-b-1 line-height-1 text-center">Products On Sale</h2>
                            <h3 className="section-sub-title ls-n-20 font-weight-normal m-b-4 text-center">All our sale
                                products in a exclusive brand selection</h3>

                            <div className="row offerItems mb-3">

                                {
                                    this.state.items.map((item, index) => {
                                        if (item.discount !== 0) {
                                            return (
                                                <Item
                                                    key={index}
                                                    item={item}
                                                    onAdd={() => this.setState({added: true})}
                                                    brandAvailable={false}
                                                    props={this.props}/>
                                            );
                                        }
                                    })
                                }
                            </div>

                        </section>

                        <section id='items' className="mt-3">

                            <div
                                className="header-center flex-1 ml-0 justify-content-end justify-content-lg-start m-b-3">
                                <div
                                    className="header-search header-search-inline header-search-category w-lg-max pr-2 pr-lg-0">
                                    <a
                                        href="#"
                                        className="search-toggle header-icon d-none d-sm-inline-block d-lg-none mr-0"
                                        role="button"
                                    >
                                        <i className="icon-search-3"/>
                                    </a>
                                    <form action="#" method="get">
                                        <div className="header-search-wrapper">
                                            <input
                                                type="search"
                                                className="form-control"
                                                placeholder="Search..."
                                                value={this.state.search}
                                                onChange={e => this.setState({search: e.target.value})}
                                            />
                                            <div className="select-custom">
                                                <select id="cat" name="cat"
                                                        onChange={event => this.getSubCatItems({name: event.target.value})}>
                                                    <option value='All Items'>All Categories</option>
                                                    {
                                                        this.state.categories.map((item, index) => (
                                                            <option key={index} value={item.name}>{item.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <button className="btn icon-search-3"/>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="row mt-5">
                                {
                                    brandAvailable &&
                                    <aside className="sidebar-home col-lg-3 col-md-4 order-lg-first">
                                        <div className="side-menu-wrapper m-b-3 border-0">
                                            <h2 className="side-menu-title bg-primary font-weight-sb text-white">
                                                <i className="icon-menu">

                                                </i>Shop By Brand</h2>

                                            <nav className="side-nav border border-top-0">
                                                <ul className="menu menu-vertical sf-arrows">
                                                    <li
                                                        className="catItem"
                                                        onClick={() => this.getBrands('All Brands')}>
                                                        <a>All Brands</a></li>
                                                    {
                                                        brands.map((item, index) => {
                                                            return (
                                                                <li
                                                                    className="catItem"
                                                                    key={index}
                                                                    onClick={() => this.getBrands(item)}>
                                                                    <a>{item}</a></li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </nav>
                                        </div>
                                    </aside>
                                }


                                <div className={itemStyle}>
                                    <h2 className="section-title ls-n-20 m-b-1 line-height-1 text-center "
                                        data-animation-delay="100"
                                        data-animation-duration="1500">{this.state.selectedItem} - {this.state.selectedBrand}</h2>
                                    <h3 className="section-sub-title ls-n-20 font-weight-normal m-b-4 text-center "
                                        data-animation-delay="100" data-animation-duration="1500">Find out items for
                                        your choice!</h3>
                                    <div className="row">
                                        {
                                            data.map((item, index) => {
                                                return (
                                                    <Item
                                                        key={index}
                                                        item={item}
                                                        onAdd={() => this.setState({added: true})}
                                                        brandAvailable={brandAvailable}
                                                        props={this.props}/>
                                                );
                                            })
                                        }
                                    </div>
                                    <Pagination count={pages} onChange={(event, page) => this.setState({page: page})}/>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="container mt-3">
                                <div className="info-boxes-container border-bottom mb-3">
                                    <div className="row row-joined">
                                        <div className="feature-box col-sm-4 col-md-4 col-lg-4  text-center">
                                            <i className="icon-earphones-alt"></i>

                                            <div className="feature-box-content">
                                                <h3 className="mb-0 pb-1">Customer Support</h3>
                                                <h5>Need Assistence?</h5>

                                                <p>Contact us.</p>
                                            </div>
                                        </div>
                                        <div className="feature-box col-sm-4 col-md-4 col-lg-4  text-center">
                                            <i className="icon-credit-card"></i>

                                            <div className="feature-box-content">
                                                <h3 className="mb-0 pb-1">Secured Payment</h3>
                                                <h5>Safe &amp; Fast</h5>

                                                <p>Multiple payment types.</p>
                                            </div>
                                        </div>
                                        <div className="feature-box col-sm-4 col-md-4 col-lg-4  text-center">
                                            <i className="icon-action-undo "></i>

                                            <div className="feature-box-content">
                                                <h3 className="mb-0 pb-1">RETURNS</h3>
                                                <h5>Easy &amp; Free</h5>

                                                <p>Return if you not clear.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="m-b-1"/>

                    </div>
                </main>
                <Footer/>
            </div>
        );
    }

}

export const Item = ({item, props, cookies, onAdd,brandAvailable}) => {

    let itemStyle = brandAvailable ? "col-6 col-md-4 col-lg-3" : "col-6 col-md-3";
    return (
        <div className={itemStyle}>
            <div className="product-default inner-quickview inner-icon"
                 data-animation-name="fadeInRightShorter">
                <figure>
                    <a onClick={() => props.history.push('/product', {item: item})}>
                        <img
                            src={item.image}
                            alt="product" widht="400"
                            height="400"/>
                    </a>

                    <div className="label-group">
                        {
                            item.discount && item.discount !== 0 ?
                                <span
                                    className="product-label label-sale">save {item.discount}%</span>
                                : null
                        }
                    </div>
                </figure>
                <div className="product-details" onClick={() => props.history.push('/product', {item: item})}>
                    <div className="category-wrap">
                        <div className="category-list">
                            <a
                                className="product-category">{item.brand + " by " + item.shop}</a>
                        </div>
                        {/*<a className="btn-icon-wish">*/}
                        {/*<i className="icon-bag"/></a>*/}
                    </div>
                    <h2 className="product-title">
                        <a>{item.name}</a>
                    </h2>

                    {
                        item.soldOut ?
                            <div className="price-box">
                                <span className="product-price">Rs. {item.price.toFixed(2)}</span>
                                <span className="old-price mb-3">Sold out</span>
                            </div> :
                            <div className="price-box">
                                {
                                    item.discount && item.discount !== 0 ?
                                        <>
                                            <span className="old-price mb-3">Rs. {item.price.toFixed(2)}</span>

                                            <span
                                                className="product-price mt-3">Rs. {(item.price - (item.price / 100 * item.discount))
                                                .toFixed(2)}</span>
                                        </>
                                        :
                                        <span className="product-price">Rs. {item.price.toFixed(2)}</span>
                                }
                            </div>
                    }


                </div>
            </div>

        </div>
    )
};
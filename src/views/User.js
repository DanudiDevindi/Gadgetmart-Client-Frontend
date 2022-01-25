import React from 'react';
import Headers from '../containers/default-layout/Header';
import Cookies from "js-cookie";
import {EmailValidation, MobileValidation, RequireValidation} from "../Validation";
import axios from "axios";
import Footer from "../containers/default-layout/Footer";
import {BASE_URL} from "../const/const";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class User extends React.Component {

    state = {
        login: true,
        error: false,
        error2: false,
        loading: false,
        loading2: false,
        email: '',
        password: '',
        name: '',
        address: '',
        number: '',
        token: false,
        customer: undefined,
        active: 0,
        orders: [],
        modal:false,
        item: null
    };

    render() {
        let token = Cookies.get('token');
        return (
            <div>
                <Headers history={this.props.history}/>
                <main className="main">
                    <nav aria-label="breadcrumb" className="breadcrumb-nav">
                        <div className="container marginTop">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a onClick={() => this.props.history.push('/')}><i
                                    className="icon-home"/></a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Profile</li>
                            </ol>

                            <div className="container">

                                {
                                    token !== undefined ?
                                        <div className="row">
                                            <aside className="sidebar col-lg-3">
                                                <div className="widget widget-dashboard">
                                                    <h3 className="widget-title">My Account</h3>

                                                    <ul className="list">
                                                        <li className={(this.state.active === 0 && "active")+" pointer"}>
                                                            <a onClick={()=>this.setState({active:0})}>Account Dashboard</a></li>
                                                        <li className={(this.state.active === 1 && "active")+" pointer"}>
                                                            <a onClick={()=>this.setState({active:1})}>My Orders</a></li>
                                                    </ul>
                                                </div>
                                            </aside>
                                            {
                                                this.state.active === 0 ?
                                                    <div className="col-lg-9 order-lg-last dashboard-content">
                                                        <h2>Edit Account Information</h2>

                                                        <form onSubmit={(e)=> {
                                                            e.preventDefault();
                                                            this.updateUser();
                                                        }}>
                                                            <div className="row">
                                                                <div className="col-md-6 form-group required-field">
                                                                    <label>Full Name </label>
                                                                    <input
                                                                        type="text"
                                                                        value={this.state.name}
                                                                        onChange={(e)=>this.setState({name:e.target.value})}
                                                                        className="form-control"/>
                                                                </div>
                                                                <div className="col-md-6 form-group required-field">
                                                                    <label>Address </label>
                                                                    <input
                                                                        type="text"
                                                                        value={this.state.address}
                                                                        onChange={(e)=>this.setState({address:e.target.value})}
                                                                        className="form-control"/>
                                                                </div>

                                                                <div className="col-md-6 form-group required-field">
                                                                    <label>Phone Number </label>
                                                                    <input
                                                                        type="number"
                                                                        value={this.state.number}
                                                                        onChange={(e)=>this.setState({number:e.target.value})}
                                                                        className="form-control"/>
                                                                </div>

                                                                <div className="col-md-6 form-group required-field">
                                                                    <label>Email Address </label>
                                                                    <input
                                                                        type="text"
                                                                        value={this.state.email}
                                                                        onChange={(e)=>this.setState({email:e.target.value})}
                                                                        className="form-control"/>
                                                                </div>
                                                            </div>


                                                            <div className="mb-2"></div>

                                                            {
                                                                this.state.error2 &&  <a className="forget-pass">
                                                                    Please input valid data!</a>
                                                            }
                                                            <div className="required text-right">* Required Field</div>
                                                            {
                                                                this.state.loading2 ?
                                                                    <div className="loading-overlay loading-overlay2">
                                                                        <div className="bounce-loader">
                                                                            <div className="bounce1"></div>
                                                                            <div className="bounce2"></div>
                                                                            <div className="bounce3"></div>
                                                                        </div>
                                                                    </div> :
                                                                    <div className="form-footer">
                                                                        <div className="form-footer-right">
                                                                            <button
                                                                                style={{height: 50, borderRadius: 50}}
                                                                                type="submit" className="btn btn-primary">Save
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                            }


                                                        </form>
                                                    </div> :
                                                    <div className="col-lg-9 order-lg-last dashboard-content">
                                                        <h2>Order History</h2>
                                                        <div className="cart-table-container">
                                                            <table className="table table-cart">
                                                                <thead>
                                                                <tr>
                                                                    <th className="product-col">Product</th>
                                                                    <th className="price-col">Status</th>
                                                                    <th className="qty-col">Address</th>
                                                                    <th className="price-col">Total Price</th>
                                                                    <th className="view-col">View More</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        this.state.orders.map((item,index)=>{
                                                                            return(
                                                                                <>
                                                                                    <tr className="product-row" key={index}>
                                                                                        <td>
                                                                                            {/*<figure className="product-image-container">*/}
                                                                                            {/*    <img*/}
                                                                                            {/*        style={{*/}
                                                                                            {/*            width: '20%'*/}
                                                                                            {/*        }}*/}
                                                                                            {/*        src={item.orderDetail[0].image}*/}
                                                                                            {/*         alt="product"/>*/}
                                                                                            {/*</figure>*/}
                                                                                            {item.orderDetail[0].name}
                                                                                            {item.orderDetail.length > 1 ? ` and ${item.orderDetail.length-1} more items`: null}
                                                                                        </td>
                                                                                        <td>{item.status}</td>
                                                                                        <td>{item.address}</td>
                                                                                        <td>Rs. {(item.totalCost).toFixed(2)}</td>
                                                                                        <td className="pointer" onClick={()=>this.onItemClick(item)}><i className="icon-list"/></td>
                                                                                    </tr>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>

                                                        </div>

                                                    </div>
                                            }


                                        </div>:
                                        <div className="row">
                                            {
                                                this.state.login ?
                                                    <div className="col-lg-12">
                                                        <ul className="checkout-steps">
                                                            <li>
                                                                <h2 className="step-title">Login</h2>

                                                                <p>If you already have an account with us. Sign in or Join with
                                                                    us.</p>

                                                                <form onSubmit={(e)=> {
                                                                    e.preventDefault();
                                                                    this.login();
                                                                }}>
                                                                    <div className="form-group required-field">
                                                                        <label>Email Address </label>
                                                                        <input
                                                                            type="text"
                                                                            value={this.state.email}
                                                                            onChange={(e)=>this.setState({email:e.target.value})}
                                                                            className="form-control"/>
                                                                    </div>

                                                                    <div className="form-group required-field">
                                                                        <label>Password </label>
                                                                        <input
                                                                            type="password"
                                                                            value={this.state.password}
                                                                            onChange={(e)=>this.setState({password:e.target.value})}
                                                                            className="form-control"/>
                                                                    </div>

                                                                    {
                                                                        this.state.error &&  <a className="forget-pass">
                                                                            Email or Password not matched!</a>
                                                                    }

                                                                    {
                                                                        this.state.loading ?
                                                                            <div className="loading-overlay loading-overlay2">
                                                                                <div className="bounce-loader">
                                                                                    <div className="bounce1"></div>
                                                                                    <div className="bounce2"></div>
                                                                                    <div className="bounce3"></div>
                                                                                </div>
                                                                            </div> :
                                                                            <div className="form-footer">
                                                                                <button
                                                                                    style={{height: 50, borderRadius: 50}}
                                                                                    type="submit"
                                                                                    className="btn btn-primary"
                                                                                >LOGIN
                                                                                </button>

                                                                                <a>Don't have an account?
                                                                                    <a onClick={() => this.setState({login: false})}
                                                                                       className="forget-pass">
                                                                                        Sign Up</a></a>
                                                                            </div>
                                                                    }

                                                                </form>
                                                            </li>
                                                        </ul>
                                                    </div> :
                                                    <div className="col-12">
                                                        <ul className="checkout-steps">
                                                            <li>
                                                                <h2 className="step-title">Register</h2>

                                                                <p>Join with us.</p>

                                                                <form onSubmit={(e)=> {
                                                                    e.preventDefault();
                                                                    this.signUp();
                                                                }}>
                                                                    <div className='row'>
                                                                        <div className="col-md-6 form-group required-field">
                                                                            <label>Full Name </label>
                                                                            <input
                                                                                type="text"
                                                                                value={this.state.name}
                                                                                onChange={(e)=>this.setState({name:e.target.value})}
                                                                                className="form-control"/>
                                                                        </div>

                                                                        <div className="col-md-6 form-group">
                                                                            <label>Password </label>
                                                                            <input
                                                                                type="password"
                                                                                value={this.state.password}
                                                                                onChange={(e)=>this.setState({password:e.target.value})}
                                                                                className="form-control"/>
                                                                        </div>
                                                                        <div className="col-md-6 form-group required-field">
                                                                            <label>Address </label>
                                                                            <input
                                                                                type="text"
                                                                                value={this.state.address}
                                                                                onChange={(e)=>this.setState({address:e.target.value})}
                                                                                className="form-control"/>
                                                                        </div>

                                                                        <div className="col-md-6 form-group required-field">
                                                                            <label>Phone Number </label>
                                                                            <input
                                                                                type="number"
                                                                                value={this.state.number}
                                                                                onChange={(e)=>this.setState({number:e.target.value})}
                                                                                className="form-control"/>
                                                                        </div>

                                                                        <div className="col-md-6 form-group required-field">
                                                                            <label>Email Address </label>
                                                                            <input
                                                                                type="text"
                                                                                value={this.state.email}
                                                                                onChange={(e)=>this.setState({email:e.target.value})}
                                                                                className="form-control"/>
                                                                        </div>
                                                                    </div>

                                                                    {
                                                                        this.state.error &&  <a className="forget-pass">
                                                                            Please input valid data!</a>
                                                                    }

                                                                    {
                                                                        this.state.loading ?
                                                                            <div className="loading-overlay loading-overlay2">
                                                                                <div className="bounce-loader">
                                                                                    <div className="bounce1"></div>
                                                                                    <div className="bounce2"></div>
                                                                                    <div className="bounce3"></div>
                                                                                </div>
                                                                            </div> :
                                                                            <div className="form-footer">
                                                                                <button style={{height: 50, borderRadius: 50}}
                                                                                        type="submit"
                                                                                        className="btn btn-primary">REGISTER
                                                                                </button>
                                                                                <a>Already have an account?
                                                                                    <a onClick={() => this.setState({login: true})}
                                                                                       className="forget-pass">
                                                                                        Sign In</a></a>
                                                                            </div>
                                                                    }

                                                                </form>
                                                            </li>
                                                        </ul>
                                                    </div>
                                            }

                                        </div>
                                }


                            </div>

                        </div>
                    </nav>
                </main>
                <Footer/>

                {
                    this.state.modal &&
                    <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                        <ModalHeader toggle={this.toggle}>Order Details</ModalHeader>
                        <ModalBody>
                            <table className="table table-cart">
                                <thead>
                                <tr>
                                    <th className="product-col">Product</th>
                                    <th className="price-col">Item Price</th>
                                    <th className="qty-col">Qty</th>
                                    <th className="price-col">Total Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.item.orderDetail.map((item,index)=>{
                                        let price = item.price;
                                        if (item.discount !== null && item.discount !== 0) {
                                            price = (item.price-(item.price/100*item.discount));
                                        }
                                        return (
                                            <>
                                                <tr className="product-row">
                                                    <td className="product-col">
                                                        <figure className="product-image-container">
                                                            <img src={item.image} alt="product"/>
                                                        </figure>
                                                        <h2 className="product-title">
                                                            {item.name}
                                                        </h2>
                                                    </td>
                                                    <td>Rs. {price.toFixed(2)}</td>
                                                    <td>{item.qty}</td>
                                                    <td>Rs. {(price * item.qty).toFixed(2)}</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </ModalBody>
                    </Modal>
                }
            </div>
        )
    }

}

export default User;
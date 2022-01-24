import React from 'react';
import Headers from '../containers/default-layout/Header';
import Cookies from "js-cookie";

class WishList extends React.Component {

    render() {
        let cart = Cookies.get('WishList');
        if (cart === undefined) {
            cart = [];
        } else {
            cart = JSON.parse(cart);
        }
        return (
            <div>
                <Headers history={this.props.history}/>
                <main className="main">
                    <nav aria-label="breadcrumb" className="breadcrumb-nav">
                        <div className="container">
                            <ol className="breadcrumb marginTop">
                                <li className="breadcrumb-item"><a onClick={() => this.props.history.push('/')}><i
                                    className="icon-home"/></a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Wish List</li>
                            </ol>
                        </div>
                    </nav>

                    <div className="container">
                        <div className="row">
                            {
                                cart.map((item, index) => {
                                    return (
                                        <Item
                                            key={index}
                                            item={item}
                                            onAdd={()=>this.setState({added:true})}
                                            cookies={Cookies}
                                            props={this.props}/>
                                    );
                                })
                            }

                        </div>
                    </div>
                </main>
            </div>
        )
    }

}

export default WishList;

const Item = ({item, props,cookies,onAdd}) => {

    let price = item.price;
    if (item.offer !== null) {
        price = (item.price-(item.price/100*item.offer.percentage));
    }

};   
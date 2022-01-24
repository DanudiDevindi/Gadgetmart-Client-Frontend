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

    const addToCart = (i) => {
        let cart = cookies.get('CartItems');
        if (cart === undefined) {
            cart = [];
            cart.push({
                id: i.id,
                name: i.name,
                image: 'http://localhost/api/uploads/' + i.images[0].name,
                price: price,
                qty: 1
            })
        } else {
            cart = JSON.parse(cart);
            let cart2 = [];
            cart.map(item => {
                cart2.push(item.id);
            });
            if (!cart2.includes(i.id)) {
                cart.push({
                    id: i.id,
                    name: i.name,
                    image: 'http://localhost:8080/api/uploads/' + i.images[0].name,
                    price: price,
                    qty: 1
                })
            }
        }
        cookies.set('CartItems',JSON.stringify(cart));
        onAdd();
    };



    return (
        <div className="col-6 col-md-4">
            <div className="product-default inner-quickview inner-icon"
                 data-animation-name="fadeInRightShorter">
                <figure>
                    <a onClick={() => props.history.push('/product', {item: item})}>
                        <img
                            src={'http://localhost:8080/api/uploads/' + item.images[0].name}
                            alt="product" widht="400"
                            height="400"/>
                    </a>

                    <div className="label-group">
                        {
                            item.offer ?
                                <span
                                    className="product-label label-sale">-{item.offer.percentage}%</span>
                                : null
                        }
                    </div>
                    
                </figure>
                <div className="product-details">
                    <div className="category-wrap">
                        <div className="category-list">
                            <a
                                className="product-category">{item.subCategory.name}</a>
                        </div>
                        <a href="#" className="btn-icon-wish">
                            <i className="icon-heart"/></a>
                    </div>
                    <h2 className="product-title">
                        <a>{item.name}</a>
                    </h2>
                    <div className="ratings-container">
                        <div className="product-ratings">
                            <span className="ratings" style={{width: item.rating + '%'}}/>
                            <span className="tooltiptext tooltip-top"/>
                        </div>
                    </div>
                    <div className="price-box">

                    </div>

                    <div className="price-box">
                        {
                            item.offer ?
                                <>
                                    <span className="old-price">{item.price.toFixed(2)}</span>
                                    <span className="product-price">Rs. {(item.price-(item.price/100*item.offer.percentage))
                                        .toFixed(2)}</span>
                                </>
                                :
                                <span className="product-price">Rs. {item.price.toFixed(2)}</span>
                        }
                    </div>
                </div>
            </div>

        </div>
    )

};   
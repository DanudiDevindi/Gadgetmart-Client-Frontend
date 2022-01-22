import React, {Component} from 'react';
import Footer from '../containers/default-layout/Footer';
import Header from '../containers/default-layout/Header';
import Headers from "../containers/default-layout/Header";

export default class AboutUs extends Component {
  render () {
    return (
      <div>
        <Header history={this.props.history} />
        <main className="main">
          <div className="container mt-2 pt-0">
            <div className="outer-container page-header page-header-bg text-left about-us-header-img">
             


            <div>
                            <img className="owl-lazy slide-bg"
                                 src={'https://cdn.pixabay.com/photo/2017/08/27/09/21/imprint-2685464_960_720.jpg'}
                                 alt="banner"
                                 width="1120" height="445"/>
                            
                        </div>


              <div className="container pl-5" style={{textAlign: "center", paddingTop:100}}>
                
                <h5 onClick={()=>this.props.history.push('/contactUs')} className="btn"  style={{background: 'darkblue', color:'white'}}>
                  Contact Us
                </h5>
              </div>
            </div>
          </div>

          <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">
                    <i className="icon-home" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  About Us
                </li>
              </ol>
            </div>
          </nav>

          <div className="container pt-0" style={{paddingBottom: 100}}>
            <div className="about-section">
              <h2 className="subtitle">About Us</h2>
              <p>
              Our company is located in Kaluthara, Sri Lanka. Gadget Mart is one of the main online selling electrical and electronic items company. For over 5 many years we have been selling excessive high-quality products to our customers. Due to our robust focal point on excellent updated nice and continuously enhancing modern technology, that regularly exceeds consumer expectations, we now supply merchandise to a huge range of first-rate manufacturers and customers around the world.
              </p>

            </div>
          </div>

         
        </main>
        <Footer />
      </div>
    );
  }
}

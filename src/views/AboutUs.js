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
              {/* src={require ('../assets/images/page-header-bg.jpg')}
                style="{{background : '70%/cover #D4E1EA url('assets/images/page-header-bg.jpg')'}}" */}
              <div className="container pl-5" style={{textAlign: "center"}}>
                
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
             
              </p>

            </div>
          </div>

         
        </main>
        <Footer />
      </div>
    );
  }
}

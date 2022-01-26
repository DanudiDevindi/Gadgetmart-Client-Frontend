import React, {Component} from 'react';
import Header from '../containers/default-layout/Header';
import Footer from '../containers/default-layout/Footer';
import Headers from "../containers/default-layout/Header";

export default class ContactUs extends Component {

    render() {
        return (
          <div>
            <Header  history={this.props.history}/>
            <main className="main">
              <nav aria-label="breadcrumb" className="breadcrumb-nav">
                <div className="container">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">
                        <i className="icon-home" />
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Contact Us
                    </li>
                  </ol>
                </div>
              </nav>
    
              <div className="container mb-8">
                <div id="maps">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d63376.55191525339!2d79.82126294719022!3d6.886471726043467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3ae25bdb2b0473d7%3A0x25dd59a03ad76bb4!2sColombo%2004%2C%20Colombo!3m2!1d6.886473!2d79.8562826!5e0!3m2!1sen!2slk!4v1643172090254!5m2!1sen!2slk"
                    frameborder="0"
                    style="border:0;"
                    allowfullscreen=""
                    aria-hidden="false"
                    tabindex="0"
                    style={{height: 450, width: 100 + '%'}}
                  ></iframe>
                </div>
    
                <div className="row">
                  <div className="col-md-8">
                    <h2 className="light-title">
                      Contact <strong>Us</strong>
                    </h2>
    
                    <form action="#">
                      <div className="form-group required-field">
                        <label htmlFor="contact-name">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="contact-name"
                          name="contact-name"
                          required
                        />
                      </div>
    
                      <div className="form-group required-field">
                        <label htmlFor="contact-email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="contact-email"
                          name="contact-email"
                          required
                        />
                      </div>
    
                      <div className="form-group">
                        <label htmlFor="contact-phone">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="contact-phone"
                          name="contact-phone"
                        />
                      </div>
    
                      <div className="form-group required-field">
                        <label htmlFor="contact-message">
                          Your message
                        </label>
                        <textarea
                          cols="30"
                          rows="1"
                          id="contact-message"
                          className="form-control"
                          name="contact-message"
                          required
                        />
                      </div>
    
                      <div className="form-footer">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
    
                  
                </div>
              </div>
            </main>
            <Footer />
          </div>
        );
      }

}

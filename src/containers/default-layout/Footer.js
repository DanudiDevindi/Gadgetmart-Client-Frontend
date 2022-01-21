import React, {Component} from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="footer" style={{background: "darkblue"}}>
          <div className="container">
            <div className="footer-top">
              <div className="row row-sm">
                <div className="col-lg-6">
                  <div>
                    <div className="widget">
                      <h4 className="widget-title">Contact Info</h4>
                      <ul className="contact-info d-flex flex-wrap">
                        <li>
                          <span className="contact-info-label">Address:</span>
                          15/A, Galle Road, Colombo 4
                        </li>
                        <li>
                          <span className="contact-info-label">Phone:</span>Toll
                          Free <a href="tel:">(011) 111 1112</a>
                        </li>
                        <li>
                          <span className="contact-info-label">Email:</span>{' '}
                          <a href="mailto:apperal360@gmail.com">gadgetmartmain12@gmail.com</a>
                        </li>
                        <li>
                          <span className="contact-info-label">
                            Working Days/Hours:
                          </span>
                          <a href="">Mon - Sun / 9:00 AM - 6:00 PM</a>
                        </li>
                      </ul>
                    </div>
                    <div className="social-icons">
                      <a
                        href="#"
                        className="social-icon social-facebook icon-facebook"
                        target="_blank"
                        title="Facebook"
                      ></a>
                      <a
                        href="#"
                        className="social-icon social-twitter icon-twitter"
                        target="_blank"
                        title="Twitter"
                      ></a>
                      <a
                        href="#"
                        className="social-icon social-instagram icon-instagram"
                        target="_blank"
                        title="Instagram"
                      ></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-4 mb-lg-0">
                      <div className="widget">
                          <h4 className="widget-title">Customer Service</h4>

                          <ul className="links link-parts row mb-0">
                              <div className="link-part col-md-6 col-sm-12">
                                  <li>
                                      <a href="/aboutUs">About us</a>
                                  </li>
                                  <li>
                                      <a href="/product">Contact us</a>
                                  </li>
                                  <li>
                                      <a href="/user">My Account</a>
                                  </li>
                              </div>
                          </ul>
                      </div>
                  </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="footer-bottom d-flex justify-content-between align-items-center flex-wrap">
              <p className="footer-copyright py-3 pr-4 mb-0">
                &copy; 2022 Gadget Mart. All Rights Reserve
              </p>

              {/*<img*/}
                {/*src={require("../../assets/assets/images/payments.png")}*/}
                {/*alt="payment"*/}
                {/*width="240"*/}
                {/*height="52"*/}
                {/*className="footer-payments py-3"*/}
              {/*/>*/}
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

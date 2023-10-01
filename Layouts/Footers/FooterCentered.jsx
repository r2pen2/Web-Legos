import React, { Component } from 'react'
import "./footers.css";

const FooterSignatureSpaceAround = ({onLoginClick}) => (
  <div className="footer-signature-space-around" data-testid="wl-footer-centered-signature-container">
    <a href="https://www.joed.dev/" className="wl-text-secondary" data-testid="wl-footer-centered-signature">Web Designer: Joe Dobbelaar</a>
    <p onClick={onLoginClick} className="underline wl-text-secondary c-pointer fw-500" data-testid="wl-footer-centered-login-button">Admin Login</p>
  </div>
)

/**
 * @param {string} loginLink - firebase login link
 */
export default class FooterCentered extends Component {
  
  static Header = (textProps) => <h1 className="wl-text-primary" data-testid="wl-footer-centered-header">{textProps.children}</h1>;

  static Content = (textProps) => <p className="wl-text-secondary" data-testid="wl-footer-centered-content">{textProps.children}</p>;

  static Link = (linkProps) => <a href={linkProps.href} className="wl-text-secondary" data-testid="wl-footer-centered-link">{linkProps.children}</a>;

  render() {
    return (
      <footer className={`wl-footer-centered ${this.props.dark && "wl-section-dark"}`} data-testid="wl-footer-centered">
        <div className="wl-footer-centered-content">
          {this.props.children}
        </div>
        <FooterSignatureSpaceAround onLoginClick={this.props.onLoginClick}/>
      </footer>
    )
  }
}

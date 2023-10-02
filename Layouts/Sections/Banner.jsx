import React, { Component } from 'react'

import "./banner.css"

class Banner extends Component {

  static Header = (headerProps) => <div data-testid="wl-banner-centered-header" className="wl-text-primary mw-1000">{headerProps.children}</div>;

  static Body = (bodyProps) => <div data-testid="wl-banner-centered-body" className="wl-text-secondary mw-1000">{bodyProps.children}</div>;

  header = React.Children.toArray(this.props.children).find(child => child.type === Banner.Header);
  body = React.Children.toArray(this.props.children).find(child => child.type === Banner.Body);
}

export class BannerCentered extends Banner {
  render() {
    return (
      <div data-testid="wl-banner-centered" className={`wl-banner flex-column align-items-center justify-content-center ${this.props.dark && "wl-section-dark"}`}>
        {this.header}
        {this.body}
      </div>
    )
  }
}

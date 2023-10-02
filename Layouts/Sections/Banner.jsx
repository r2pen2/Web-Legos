import React, { Component } from 'react'

import "./banner.css"

class Banner extends Component {

  static Header = (headerProps) => <div className="wl-text-primary wl-banner-header">{headerProps.children}</div>;

  static Body = (bodyProps) => <div className="wl-text-secondary wl-banner-body">{bodyProps.children}</div>;

  header = React.Children.toArray(this.props.children).find(child => child.type === Banner.Header);
  body = React.Children.toArray(this.props.children).find(child => child.type === Banner.Body);
}

export class BannerCentered extends Banner {
  render() {
    return (
      <div className={`wl-banner flex-column align-items-center justify-content-center ${this.props.dark && "wl-section-dark"}`}>
        {this.header}
        {this.body}
      </div>
    )
  }
}

import React, { Component } from 'react'

export class WLThemeProvider extends Component {
  render() {
    return (
      <div
        style={{
          "--wl-background": this.props.theme.backgroundColor,
          "--wl-background-dark": this.props.theme.backgroundDark,
          "--wl-text-primary": this.props.theme.textPrimary,
          "--wl-text-secondary": this.props.theme.textSecondary,
          "--wl-text-tertiary": this.props.theme.textTertiary,
          "--wl-primary": this.props.theme.primary,
          "--wl-link-hover": this.props.theme.linkHover,
        }}
      >
        {this.props.children}
      </div>
    )
  }
}

export function createWLTheme(parameters) {

  const defaults = {
    backgroundColor: "#f4fbfc",
    backgroundDark: "#1E1E1E",
    textPrimary: "ef4040",
    textSecondary: "#5F5A67",
    textTertiary: "#8C8C8C",
    primary: "#5738B3",
    linkHover: "#5F5A67",
  }

  if (!parameters) {
    return defaults;
  }

  return {
    backgroundColor: parameters.backgroundColor ? parameters.backgroundColor : defaults.backgroundColor,
    backgroundDark: parameters.backgroundDark ? parameters.backgroundDark : defaults.backgroundDark,
    textPrimary: parameters.textPrimary ? parameters.textPrimary : defaults.textPrimary,
    textSecondary: parameters.textSecondary ? parameters.textSecondary : defaults.textSecondary,
    textTertiary: parameters.textTertiary ? parameters.textTertiary : defaults.textTertiary,
    primary: parameters.primary ? parameters.primary : defaults.primary,
    linkHover: parameters.linkHover ? parameters.linkHover : defaults.linkHover,
  }
}
import { Component } from "react";
import { Divider, Dropdown, Navbar } from "@nextui-org/react";
import { SocialButton, SocialIcon } from "./Icons";

/**
 * @param {string} showin - breakpoint to start showing WLNavSocials
 * @param {boolean} lineLeft - whether to show a line on the left side
 * @param {boolean} lineRight - whether to show a line on the right side
 */
export class WLNavSocials extends Component {

  /**
   * A button for social platforms in the navbar
   * @param {string} playformKey - platform to display button for 
   * @param {string} color - alternative color for button 
   * @param {string} href - link to social platform 
   * @param {number} size - size of button
   * @param {boolean} bordered - whether to include a border around the button 
   * @param {boolean} noHide - whether socials will stay visible at all widths 
   * @default
   * size = 32
   * bordered = false
   * noHide = false
   * @returns 
   */
  static Button({platformKey, color, href, size, bordered}) {
    return <SocialButton bordered={bordered} borderColor={color} socialIcon={<SocialIcon platformKey={platformKey} color={color} size={size ? size : 32} />} color={color} socialLink={href} />
  }

  render() {
    return (
      <div className={`d-flex flex-row align-items-center justify-content-start gap-2 ${!this.props.noHide ? "d-none" : ""} d${!this.props.noHide ? (this.props.showIn ? "-" + this.props.showIn : "-xxl") : ""}-flex`}>  
          { this.props.lineLeft && <Divider className="d-none d-xxl-inline mx-2" css={{width: "3rem"}}/> }
          { this.props.children }
          { this.props.lineRight && <Divider className="d-none d-xxl-inline mx-2" css={{width: "3rem"}}/> }
      </div>
    )
  }
}

export class WLNavContent extends Component {
  
  static Left(props) {
    return <div className="d-flex flex-row align-items-center justify-content-start">{props.children}</div>
  }
  
  static Right(props) {
    return <div className="d-flex flex-row align-items-center justify-content-end">{props.children}</div>
  }
  
  render () {
    return this.props.children;
  }
}

/**
 * @param {boolean} buttonBordered - whether to display bordered button for dropdown menu
 * @param {string} buttonText - text to display in button
 * @param {string} buttonFontSize - font size inside button
 */
export class WLNavDropdownMenu extends Component {

  render() {

    return (
      <Navbar.Content>
        <Dropdown isBordered>
          <Navbar.Item
            css={{
              fontSize: this.props.buttonFontSize
            }}
          >
            <Dropdown.Button auto bordered={this.props.buttonBordered}>
              {this.props.buttonText}
            </Dropdown.Button>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="navbar-dropdown-menu"
            css={{
              $$dropdownMenuWidth: "340px",
              $$dropdownItemHeight: "70px",
              "& .nextui-dropdown-item": {
                py: "$4",
                // dropdown item left icon
                svg: {
                  color: "$secondary",
                  mr: "$4",
                },
                // dropdown item title
                "& .nextui-dropdown-item-content": {
                  w: "100%",
                  fontWeight: "$semibold",
                },
              },
            }}
            onAction={(key) => {
              for (const link of this.props.links) {
                if (link.key === key) {
                  window.open(link.href, "_blank");
                }
              }
            }}
          >
            {this.props.children}
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
    )
  }
}
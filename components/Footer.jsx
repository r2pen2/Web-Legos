// Library Imports
import { Divider, Text } from "@nextui-org/react";
import { Component } from "react";
import { SocialButton, SocialIcon } from "./Icons";

export function Copyright({year, name}) {
  return (
    <Text size="$sm">
      Copyright © {year} {name}
    </Text>
  )
}

/**
 * Component to show a list of socials in the footer
 * @param {boolean} lineTop - whether to show a line on top of this social list
 * @param {boolean} lineBottom - whether to show a line below this social list
 */
export class WLFooterSocials extends Component {

  /**
   * A button for social platforms in the navbar
   * @param {string} playformKey - platform to display button for 
   * @param {string} color - alternative color for button 
   * @param {string} href - link to social platform 
   * @param {number} size - size of button 
   * @returns 
   */
  static Button({platformKey, color, href, size}) {
    return <SocialButton socialIcon={<SocialIcon platformKey={platformKey} color={color} size={size} />} color={color} socialLink={href} />
  }

  render() {
    return (
      <div className={`d-flex flex-column align-items-center justify-content-center gap-2 py-2`}>  
        { this.props.lineTop && <Divider /> }
        <div className={`d-flex flex-row align-items-center justify-content-center gap-10`}>  
          { this.props.children }
        </div>
        { this.props.lineBottom && <Divider /> }
      </div>
    )
  }
}
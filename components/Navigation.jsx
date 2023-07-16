import { Component } from "react";
import { Divider } from "@nextui-org/react";
import { SocialButton, SocialIcon } from "./Icons";

/**
 * @param {string} showin - breakpoint to start showing WLNavSocials
 * @param {boolean} left - whether this is shown on the left side of the navbar
 */
export class WLNavSocials extends Component {

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
      <div className={`d-flex flex-row align-items-center justify-content-start gap-2 d-none d-${this.props.showIn ? this.props.showIn : "xxl"}-flex`}>  
          { this.props.lineLeft && <Divider className="d-none d-xxl-inline mx-2" css={{width: "3rem"}}/> }
          { this.props.children }
          { this.props.lineRight && <Divider className="d-none d-xxl-inline mx-2" css={{width: "3rem"}}/> }
      </div>
    )
  }
}
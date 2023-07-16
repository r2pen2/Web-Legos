import { Component } from "react";
import { Divider } from "@nextui-org/react";
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
   * @default
   * size = 32
   * bordered = false
   * @returns 
   */
  static Button({platformKey, color, href, size, bordered}) {
    return <SocialButton bordered={bordered} borderColor={color} socialIcon={<SocialIcon platformKey={platformKey} color={color} size={size ? size : 32} />} color={color} socialLink={href} />
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
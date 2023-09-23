import { Component } from "react";
import "../assets/style/backgrounds.css";

/**
 * A background container class
 * @param {string} placement - background image placement
 * @param {string} color - background image color
 * @param {string} fadeColor - color to fade into
 */
export class WLBackground extends Component {
  /** Where to place background SVG */
  placementClass = this.props.placement ? this.props.placement : "left"
  /** Background SVG color */
  color = this.props.color
  /** Height of fade-out */
  fadePosition = this.props.fadePosition ? this.props.fadePosition : "100%";
  
  /** SVG to be set by child classes */
  svg;

  render() {
    return (
      <div className="w-100" style={{position: "absolute", height: this.props.sectionHeight}}>
        {this.svg}
        {this.props.fadeColor && 
          <div 
            className="background-fade-out" 
            style={{
              backgroundImage: `linear-gradient(180deg, transparent ${this.props.fadePosition}, ${this.props.fadeColor} 100%)`,
            }} 
          />
        }
      </div>
    )
  }
}

export class RockCandyBackground1 extends WLBackground {
  svg = <svg className={`background-${this.placementClass}`} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><g xmlns="http://www.w3.org/2000/svg" transform="matrix(0 1 -1 0 500 -0)"><g mask="url(&quot;#SvgjsMask1095&quot;)" fill="none"><path d="M61 500L561 0L873 0L373 500z" fill="url(&quot;#SvgjsLinearGradient1096&quot;)"></path><path d="M357.8 500L857.8 0L1312.3 0L812.3 500z" fill="url(&quot;#SvgjsLinearGradient1096&quot;)"></path><path d="M651.6 500L1151.6 0L1427.6 0L927.6 500z" fill="url(&quot;#SvgjsLinearGradient1096&quot;)"></path><path d="M1413 500L913 0L437.5 0L937.5 500z" fill="url(&quot;#SvgjsLinearGradient1097&quot;)"></path><path d="M1060.2 500L560.2 0L344.20000000000005 0L844.2 500z" fill="url(&quot;#SvgjsLinearGradient1097&quot;)"></path><path d="M754.4 500L254.39999999999998 0L188.39999999999998 0L688.4 500z" fill="url(&quot;#SvgjsLinearGradient1097&quot;)"></path><path d="M1042.4194561002657 500L1440 102.41945610026568L1440 500z" fill="url(&quot;#SvgjsLinearGradient1096&quot;)"></path><path d="M0 500L397.5805438997343 500L 0 102.41945610026568z" fill="url(&quot;#SvgjsLinearGradient1097&quot;)"></path></g><defs><mask id="SvgjsMask1095"><rect width="1440" height="500" fill="#ffffff"></rect></mask><linearGradient x1="0%" y1="100%" x2="100%" y2="0%" id="SvgjsLinearGradient1096"><stop stopColor={this.color} offset="0"></stop><stop stopOpacity="0" stopColor={this.color} offset="0.66"></stop></linearGradient><linearGradient x1="100%" y1="100%" x2="0%" y2="0%" id="SvgjsLinearGradient1097"><stop stopColor={this.color} offset="0"></stop><stop stopOpacity="0" stopColor={this.color} offset="0.66"></stop></linearGradient></defs></g></svg>
}

export function GrowingCircles({color, size, transparency}) {
  
  const circleTransparency = transparency ? transparency : "05";
  const circleColor = color ? color + "22" : "rgba(121, 40, 202, 0.2)"
  const circleGradient = `linear-gradient(-180deg, ${color + circleTransparency} 40%, transparent 100%)` 

  return (
    <div className="growing-circle-container" style={{height: size, width: size}}>
      <div className="growing-circle growing-circle-static" style={{height: size, width: size, borderColor: circleColor, backgroundImage: circleGradient}} />
      <div className="growing-circle growing-circle-1" style={{height: size, width: size, borderColor: circleColor, backgroundImage: circleGradient}}/>
      <div className="growing-circle growing-circle-2" style={{height: size, width: size, borderColor: circleColor, backgroundImage: circleGradient}}/>
      <div className="growing-circle growing-circle-3" style={{height: size, width: size, borderColor: circleColor, backgroundImage: circleGradient}}/>
    </div>
  )
}
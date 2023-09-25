import React from "react"
import { ColorMaster } from "../api/colors";

/**
 * A little floating island looking thing
 * @param {string} color - island color
 * @param {number} width - width of widest island
 * @param {string} weight - line weight
 * @param {boolean} flipY - whether to flip vertically
 * @param {number} steepness - how much to subtract from width on each island
 * @param {number} islandCount - how many islands to render 
 * @param {number} zIndex - custom zIndex
 * @default
 * weight = ".25rem";
 * flipY = false;
 * steepness = 20;
 * islandCount = 4;
 * @returns 
 */
export function FloatingIsland({color, width, weight, flipY, steepness, islandCount, zIndex}) {
  
  const transform = flipY ? "scaleY(-1)" : null
  const lineHeight = weight ? weight : "0.25rem";
  const lineSteepness = steepness ? steepness : 20;

  function renderIslands() {
    let n = 4;
    if (islandCount) {
      n = islandCount;
    }
    let widths = [];
    for (let i = 0; i < n; i++) {
      widths.push(`${100-(lineSteepness*i)}%`)
    }
    return widths.map((w, i) => {
      return <div key={i} style={{width: w, height: lineHeight, backgroundColor: color}}/>
    })
  }

  return (
    <div className="d-flex flex-row align-items-center justify-content-center w-100 px-2 px-lg-5" style={{transform: transform}}>
      <div style={{width: width, gap: "1rem", position: "relative", zIndex: zIndex ? zIndex : 1}} className="d-flex flex-column align-items-center justify-content-center">
        {renderIslands()}
      </div>
    </div>
  )
}

export function Mountains({style, color1, color2, color3, color4, color5, color6}) {
  
  const shadowHex = "#-452427"
  const mountainMaster = new ColorMaster();
  mountainMaster.shade = shadowHex; 

  const sun1 = color1;
  const shadow1 = `#${mountainMaster.applyShade(color1)}`
  const sun2 = color2;
  const shadow2 = `#${ColorMaster.subtractHexColor(color2, "191009")}`
  const sun3 = color3;
  const shadow3 = `#${mountainMaster.applyShade(color3)}`
  const sun4 = color4;
  const shadow4 = color4;
  const sun5 = color5;
  const shadow5 = `#${mountainMaster.applyShade(color5)}`
  const sun6 = color6;
  const shadow6 = `#${ColorMaster.subtractHexColor(color6, "C0904")}`

  return (
    <svg xmlns="http://www.w3.org/2000/svg" classname="w-100" viewBox="-60 450 1770 450" style={style}>
      <polygon fill={sun3} points="957 450 539 900 1396 900"/>
      <polygon fill={shadow3} points="957 450 872.9 900 1396 900"/>
      <polygon fill={sun1} points="-60 900 398 662 816 900"/>
      <polygon fill={shadow1} points="337 900 398 662 816 900"/>
      <polygon fill={sun5} points="1203 546 1552 900 876 900"/>
      <polygon fill={shadow5} points="1203 546 1552 900 1162 900"/>
      <polygon fill={sun2} points="641 695 886 900 367 900"/>    
      <polygon fill={shadow2} points="587 900 641 695 886 900"/>
      <polygon fill={sun6} points="1710 900 1401 632 1096 900"/>
      <polygon fill={shadow6} points="1710 900 1401 632 1365 900"/>
      <polygon fill={sun4} points="1210 900 971 687 725 900"/>
      <polygon fill={shadow4} points="943 900 1210 900 971 687"/>
    </svg>
  )
}
import React from "react"

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
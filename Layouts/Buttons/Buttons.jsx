import React from 'react'
import "./buttons.css"

import {Button} from "@nextui-org/react"
import { ColorMaster } from '../../api/colors'

export function ButtonRounded(props) {

  const buttonHoverColor = `#${ColorMaster.addHexColor(props.color, "#111111")}`

  return (
    <Button 
      data-testid="wl-button-rounded" 
      onClick={props.onClick} 
      size={props.size} 
      className="wl-rounded-button" 
      style={{
        "--wl-button-color": props.color,
        "--wl-button-hover-color": buttonHoverColor
      }}
    >
      {props.children}
    </Button>
  )
}

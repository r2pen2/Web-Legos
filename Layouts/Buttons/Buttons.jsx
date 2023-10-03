import React from 'react'
import "./buttons.css"

import {Button} from "@nextui-org/react"

export function ButtonRounded(props) {
  return (
    <Button data-testid="wl-button-rounded" onClick={props.onClick} size={props.size} className="wl-rounded-button" style={{backgroundColor: props.color}}>
      {props.children}
    </Button>
  )
}

import React from 'react'
import "./buttons.css"

import {Button} from "@nextui-org/react"

export function RoundedButton(props) {
  return (
    <Button onClick={props.onClick} size={props.size} className="wl-rounded-button" style={{backgroundColor: props.color}}>
      {props.children}
    </Button>
  )
}

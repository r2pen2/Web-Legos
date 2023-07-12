// Library Imports
import { Text } from "@nextui-org/react";

// Style Imports
import "../assets/style/text.css";

export function TextBlock(props) {
  return (
    <Text p align="left" size={props.size} color={props.color} className="web-legos-text-indent">
      {props.children}
    </Text>
  )
}

export function WLText(props) {


  function getWLTextClasses() {
    let classes = "";
    if (props.indent) {
      classes += "web-legos-text-indent ";
    }
    return classes;
  }

  return (
    <Text
     p 
     align={props.align} 
     size={props.size} 
     color={props.color}
     className={getWLTextClasses()}
    >
      {props.children}
    </Text>
  )
}
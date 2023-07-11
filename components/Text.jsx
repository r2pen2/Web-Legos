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
// Library Imports
import { Text } from "@nextui-org/react";

// Style Imports
import "../assets/style/text.css";
import { useEffect, useRef, useState } from "react";

export function TextBlock(props) {
  return (
    <Text p align="left" size={props.size} color={props.color} className="web-legos-text-indent">
      {props.children}
    </Text>
  )
}

/**
 * Editable text component compatible with {@link https://github.com/r2pen2/Server-Legos}. Fetches text from the server
 * on mount and sends updates onBlur when in edit mode.
 * @param {React.JSX.Element} children - whether to indent text 
 * @param {boolean} indent - whether to indent text 
 * @param {string} align - text alignment 
 * @param {string} color - text color 
 * @param {number} size - text size  
 * @param {boolean} editable - whether this text is currently editable  
 * @param {string} firestoreId - id for this text in its firestoreCollection  
 * @returns 
 */
export function WLText(props) {

  function WLParagraph({paragraphText}) {
    const ref = useRef(null);

    /**
     * Get the correct css classes by WLText props
     * @returns classes for <Text /> component
     */
    function getWLTextClasses() {
      let classes = "";
      if (props.indent) { classes += "web-legos-text-indent "; }
      return classes;
    }

    useEffect(() => {
      ref.current.innerHTML = paragraphText;
    })

    return <Text ref={ref} p align={props.align} size={props.size} color={props.color} className={getWLTextClasses()} />;
  }

  const [paragraphs, setParagraphs] = useState([]);

  useEffect(() => {
    fetch(`/site-text?id=${props.firestoreId}`).then((res) => {
      res.text().then((text) => {
        console.log(text);
        setParagraphs(text.split("<br/>"));
      })
    })
  }, [props.firestoreId, props.indent]);

  return paragraphs.map((p, index) => {
    return <WLParagraph paragraphText={p} key={`${props.firestoreId}-${index}`} />;
  });
}

export function WLTextBlock(props) {
  return <WLText indent={true} align="left" color={props.color} size={props.size} firestoreId={props.firestoreId} />;
}
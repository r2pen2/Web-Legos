// Library Imports
import { Button, Link, Loading, Text, Textarea } from "@nextui-org/react";

// Style Imports
import "../assets/style/text.css";
import { useEffect, useRef, useState, Component } from "react";
import { HTMLToMarkdown, markdownToHTML } from "../api/strings";

/**
 * A simple indented text block
 * @param {string} size - text size 
 * @param {string} color - text block color 
 * @param {React.ReactNode} children - text to render 
 * @returns 
 */
export function TextBlock(props) {
  return (
    <Text align="left" size={props.size} color={props.color} className="web-legos-text-indent">
      {props.children}
    </Text>
  )
}

/**
 * Editable text component compatible with {@link https://github.com/r2pen2/Server-Legos}. Fetches text from the server
 * on mount and sends updates onBlur when in edit mode.
 * @param {Function} setLoaded - function for {@link WLText} to call when the text is fetched from server 
 * @param {React.JSX.Element} children - whether to indent text 
 * @param {boolean} indent - whether to indent text 
 * @param {string} align - text alignment 
 * @param {string} color - text color 
 * @param {number} size - text size  
 * @param {boolean} editable - whether this text is currently editable  
 * @param {string} firestoreId - id for this text in its firestoreCollection  
 * @param {boolean} showSpinner - whether to show a loading spinner
 * @default
 * shopSpinner = false;  
 * @returns 
 */
export function WLText(props) {
  
  // Create states
  const [originalText, setOriginalText] = useState("");   // Text first received from DB
  const [editableText, setEditableText] = useState("");   // Current value of the Textfield if editing
  const [showSaved, setShowSaved] = useState(false);      // Whether to show the "Changes saved" message
  const [editMode, setEditMode] = useState(false);        // Whether the user is editing this WLText
  const [paragraphs, setParagraphs] = useState(null);     // Paragraphs from DB to present

  /**
   * A formatted WLParagraph from the WLText props after pulling from DB
   * @param {string} paragraphText - text to render in this paragraph 
   */
  function WLParagraph({paragraphText}) {

    /** React ref for inserting HTML to paragraphs after component mount */
    const ref = useRef(null);

    /**
     * Get the correct css classes by WLText props
     * @returns classes for <Text /> component
     */
    function getWLTextClasses() {
      let classes = "";
      if (props.indent) { classes += "web-legos-text-indent "; }
      if (props.textClasses) { classes += props.textClasses + " "; }
      return classes;
    }

    // When component mounts, set innerHTML to text from DB + add any prefix
    useEffect(() => {
      ref.current.innerHTML = (props.prefix ? props.prefix : "") + paragraphText;
    })

    // If this is a header, render as a header.
    if (props.headerLevel) {
      switch (props.headerLevel) {
        case 1: 
          return <Text ref={ref} h1 align={props.align} size={props.size} color={props.color} className={getWLTextClasses() + " web-legos-header-1"}/>;
        case 2: 
          return <Text ref={ref} h2 align={props.align} size={props.size} color={props.color} className={getWLTextClasses() + " web-legos-header-2"}/>;
        case 3: 
          return <Text ref={ref} h3 align={props.align} size={props.size} color={props.color} className={getWLTextClasses() + " web-legos-header-3"}/>;
        case 4: 
          return <Text ref={ref} h4 align={props.align} size={props.size} color={props.color} className={getWLTextClasses() + " web-legos-header-4"}/>;
        case 5: 
          return <Text ref={ref} h5 align={props.align} size={props.size} color={props.color} className={getWLTextClasses() + " web-legos-header-5"}/>;
        default:
          return;
      }
    }

    // Return paragraph 
    return <Text ref={ref} align={props.align} size={props.size} color={props.color} className={getWLTextClasses()}>{props.children}</Text>;
  }

  // When the component mounts, request the necessary siteText from server and let all parent components know that data has been loaded.
  useEffect(() => {
    if (!props.firestoreId) { 
      // No need to query DB if there's no firestoreId defined
      setParagraphs([]);
      if (props.setLoaded) {
        props.setLoaded(true);
      }
      return; 
    }
    // Ask DB for the right text
    fetch(`/site-text?id=${props.firestoreId}`).then((res) => {
      res.text().then((text) => {
        // Split into paragraphs at line breaks
        setParagraphs(text.split("<br/>"));
        // And convert HTML into markdown for editing 
        const markdownText = HTMLToMarkdown(text);
        setOriginalText(markdownText);
        setEditableText(markdownText);
        // Tell parent components that we're ready
        if (props.setLoaded) {
          props.setLoaded(true);
        }
      })
    })
  }, [props.firestoreId, props.indent, props.setLoaded, props]);

  /**
   * Set {@link editableText} and {@link showSaved} states when text area's value is updated
   * @param {Event} e - text change event 
   */
  function handleTextareaChange(e) {
    const newText = e.target.value;
    setEditableText(newText);
    setShowSaved(false);
  }

  /**
   * Handle save changes button click by sending new text to /site-text and reloading the page after one second.
   */
  function sendTextUpdateToServer() {
    if (editableText === originalText) { setEditMode(false); return; }
    setOriginalText(editableText);
    fetch(`/site-text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: props.firestoreId,
        newText: markdownToHTML(editableText),
      }),
    });
    setShowSaved(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  if (editMode) {
    // If we're in edit mode, return a Textarea and buttons to save / cancel
    return (
      <div className="d-flex flex-column align-items-center justify-content-center w-100 gap-2">
        <Textarea fullWidth helperColor={showSaved ? "success" : null} status={showSaved ? "success" : null} helperText={showSaved ? "Your changes have been saved!" : null} label={`Editing Text: ${props.firestoreId}`} value={editableText} onChange={handleTextareaChange}/>
        <div className="d-flex flex-row gap-2">
          { editMode && <Button color="error" onClick={() => setEditMode(false)} flat>Cancel</Button> }
          { editMode && <Button color="success" onClick={sendTextUpdateToServer} flat>Save Changes</Button> }
        </div>
      </div>
    )
  }

  /**
   * Render paragraphs retrieved from server with appropriate parameters
   * @returns paragraphs from server mapped to {@link WLParagraph} components
   */
  function renderParagraphs() {
    return paragraphs.map((p, index) => {
      return <WLParagraph paragraphText={p} key={`${props.firestoreId}-${index}`} />;
    });
  }

  return (
    <div className={"d-flex flex-column gap-2 w-100 px-2 px-md-3 " + (props.editable ? "web-legos-text-editable" : "")} onClick={() => setEditMode(props.editable)}>
      { paragraphs ? renderParagraphs() : (props.showSpinner && <Loading color="primary" />) }
      { editMode && <Button color="success" onClick={sendTextUpdateToServer}>Save Changes</Button> }
      { props.children && <WLParagraph paragraphText={props.children} /> }
    </div>
  )
}

/**
 * Web-Legos text block. Aligns paragraphs left and indents by default.
 * @param {Function} setLoaded - function for {@link WLText} to call when the text is fetched from server 
 * @param {boolean} indent - whether paragraphs are indented
 * @param {string} align - paragraph alignment
 * @param {string} color - text color
 * @param {string} size - text size
 * @param {string} firestoreId - ID of the siteText that this header pulls from
 * @param {boolean} editable - whether the current user has permission to edit this header
 * @param {string} textClasses - classes to apply on text inside the returned {@link WLText} component
 * @param {React.ReactNode} children - component children (static text)
 * @param {boolean} showSpinner - whether to show a loading spinner
 * @default
 * indent = true
 * align = "left"  
 * headerLevel = 1
 * @returns 
 */
export function WLTextBlock(props) {
  return <WLText showSpinner={props.showSpinner} setLoaded={props.setLoaded} indent={true} align="left" color={props.color} size={props.size} firestoreId={props.firestoreId} editable={props.editable} textClasses="web-legos-scaling-text-block">{props.children}</WLText>;
}

/**
 * Web-Legos editable header
 * @param {Function} setLoaded - function for {@link WLText} to call when the text is fetched from server 
 * @param {string} align - header alignment
 * @param {string} color - header color
 * @param {string} size - header size
 * @param {string} firestoreId - ID of the siteText that this header pulls from
 * @param {boolean} editable - whether the current user has permission to edit this header
 * @param {number} headerLevel - level of header to display (ex. 1, 2, 3, etc.)
 * @param {string} textClasses - classes to apply on text inside the returned {@link WLText} component
 * @param {React.ReactNode} children - component children (static text)
 * @param {boolean} showSpinner - whether to show a loading spinner
 * @default
 * align = "center"  
 * headerLevel = 1
 * @returns 
 */
export function WLHeader(props) {
  return <WLText showSpinner={props.showSpinner} setLoaded={props.setLoaded} align={props.align} color={props.color} size={props.size} firestoreId={props.firestoreId} editable={props.editable} headerLevel={props.headerLevel ? props.headerLevel : 1} textClasses="web-legos-scaling-header">{props.children}</WLText>;
}

/**
 * Web-Legos editable text, size small, with a built in copyright prefix. Always looks for siteText with firestoreId="copyright"
 * @param {boolean} editable - whether the current user has permission to edit the copyright
 */
export function WLCopyright({editable}) {
  return (
    <WLText firestoreId="copyright" size="$sm" editable={editable} prefix="Copyright © " />
  )
}

/**
 * A page header with a textured background
 * @param {string} color - color to overlay on background
 * @param {string} backgroundVariant - background variant key (ex. )
 * @param {string} text - text to place inside WLBlockHeader
 * @todo add other backgrounds lol
 */
export class WLBlockHeader extends Component {
  /**
   * Button for jumping to a section on the page from the WLBlockHeader
   * @param {string} title - text to display in section button
   * @param {string} sectionId - id of the section that you would like to jump to on button click 
   * @returns 
   */
  static Section({title, sectionId}) {
    function handleClick() {
      window.location.hash = "";
      window.location.hash = `#${sectionId}`;
    }
  
    return (
      <div className="col-lg-3 col-md-12 d-flex flex-column align-items-center">
        <Link block color="white" size="md" onClick={handleClick}>
          <Text color="white">
            {title}
          </Text>
        </Link>
      </div>
    )
  }

  render() {
    return (
      <section style={{marginBottom: "2rem"}} className={`${this.props.short ? "web-legos-header-block-short" : ""} web-legos-header-block web-legos-header-block-background-` + this.props.backgroundVariant} >
        <div style={{zIndex: -1, backgroundColor: this.props.color, position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}} />
        <WLHeader color="white">
          {this.props.text}
        </WLHeader>
        { this.props.children && (
          <div className="container">
            <div className="row d-flex flex-row justify-content-center">
              { this.props.children }
            </div>
          </div>
        ) }
      </section>
    )
  }
}
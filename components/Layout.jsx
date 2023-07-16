import React, { useEffect, useState } from "react";
import "../assets/style/layout.css";
import { WLImage } from "./Images";
import { WLHeader, WLTextBlock } from "./Text";
import { Loading, Text } from "@nextui-org/react";

/**
 * Web-Legos section that renders from firestoreId
 * @param {string} justifyTop - top section justification
 * @param {string} justifyLeft - left section justification
 * @param {string} justifyRight - right section justification
 * @param {string} columnWidthLeft - column width for left section
 * @param {string} columnWidthRight - column width for right section
 * @param {string} sectionClasses - classes to apply on rendered <section /> element
 * @param {string} sectionId - id of the section to render
 * @param {React.ReactNode} topContent - content to place in top section
 * @param {React.ReactNode} leftContent - content to place in left section
 * @param {React.ReactNode} rightContent - content to place in right section
 * @param {React.ReactNode} bottomContent - content to place in bottom section
 * @default
 * justifyTop = "center"
 * justifyLeft = "center"
 * justifyRight = "center" 
 * columnWidthLeft = "6"
 * columnWidthRight = "6"
 */
export function WLResponsiveSection(props) {

  /** Justification string for top section */
  const topJustification = props.justifyTop ? props.justifyTop : "center";
  /** Justification string for left section */
  const leftJustification = props.justifyLeft ? props.justifyLeft : "center";
  /** Justification string for right section */
  const rightJustification = props.justifyRight ? props.justifyRight : "center";
  /** Column width for left section */
  const leftCol = props.columnWidthLeft ? props.columnWidthLeft : "6";
  /** Column width for right section */
  const rightCol = props.columnWidthRight ? props.columnWidthRight : "6";

  return (
    <section className={"container-fluid py-lg-5 py-3 " + props.sectionClasses} id={props.sectionId}>
      <div className={`d-flex flex-column align-items-center justify-content-${topJustification}`}>
        {props.topContent} 
      </div>
      <div className="row">
        <div className={`col-xxl-${leftCol} py-xl-4 py-3 col-xl-12 web-legos-responsive-section d-flex flex-column align-items-center justify-content-${leftJustification}`}>
          {props.leftContent}
        </div>
        <div className={`col-xxl-${rightCol} py-xl-4 py-3 col-xl-12 web-legos-responsive-section d-flex flex-column align-items-center justify-content-${rightJustification}`} >
          {props.rightContent}
        </div>
      </div>
      {props.bottomContent}
    </section>
  )
}

/**
 * Web-Legos section that renders from firestoreId
 * @param {string} justifyTop - top section justification
 * @param {string} justifyLeft - left section justification
 * @param {string} justifyRight - right section justification
 * @param {string} columnWidthLeft - column width for left section
 * @param {string} columnWidthRight - column width for right section
 * @param {string} sectionClasses - classes to apply on rendered <section /> element
 * @param {string} textColor - color of text in this section
 * @param {boolean} editable - whether current user has permission to edit this section
 * @param {string} firestoreId - id of the section to render from firestore
 * @param {React.ReactNode} topContent - content to place in top section
 * @param {React.ReactNode} bottomContent - content to place in bottom section
 * @param {React.ReactNode} header - replacement header component
 * @param {React.ReactNode} text - replacement text component
 * @param {React.ReactNode} image - replacement image component
 * @param {boolean} textRight - whether to display text on the right side of the section
 * @param {boolean} stackHeader - whether to stack header on top of text
 * @param {Function} setLoaded - function to tell parent components that all parts of section have been loaded
 * @default
 * justifyTop = "center"
 * justifyLeft = "center"
 * justifyRight = "center" 
 * columnWidthLeft = "6"
 * columnWidthRight = "6"
 */
export function WLResponsiveSectionEditable(params) {

  // Create states
  const [textLoaded, setTextLoaded] = useState(false);      // Whether text has loaded
  const [headerLoaded, setHeaderLoaded] = useState(false);  // Whether header has loaded

  /** Rendered header component */
  const headerRender = params.header ? params.header : <WLHeader setLoaded={setHeaderLoaded} editable={params.editable} firestoreId={`${params.firestoreId}-header`} color={params.textColor ? params.textColor : "primary"} headerLevel={1} />;
  /** Rendered text component */
  const textRender = <WLTextBlock setLoaded={setTextLoaded} editable={params.editable} className="px-4 px-md-5" firestoreId={params.firestoreId} color={params.textColor} />;
  /** Rendered imagea component */
  const imageRender = <WLImage firestoreId={params.firestoreId} editable={params.editable} shadow halfWidth/>;

  // Set parent's loaded state if text and header have loaded
  useEffect(() => {
    if (params.setLoaded) {
      params.setLoaded(textLoaded && headerLoaded);
    }
  }, [textLoaded, headerLoaded, params])

  return (
    <WLResponsiveSection
      justifyLeft={params.justifyLeft} 
      justifyRight={params.justifyRight}
      justifyTop={params.justifyTop}
      sectionId={params.firestoreId}
      sectionClasses={params.sectionClasses}
      columnWidthLeft={params.columnWidthLeft}
      columnWidthRight={params.columnWidthRight}
      leftContent={
        params.textRight 
        ? 
          params.image ? params.image : imageRender
        :
          <WLCenteredColumn>          
            { params.stackHeader && headerRender }
            { params.text ? params.text : textRender }
          </WLCenteredColumn>
      }
      rightContent={
        params.textRight 
        ? 
          <WLCenteredColumn>          
            { params.stackHeader && headerRender }
            { params.text ? params.text : textRender }
          </WLCenteredColumn>
        :
          params.image ? params.image : imageRender
      }
      topContent={!params.stackHeader ? headerRender : params.topContent}
      bottomContent={params.bottomContent}
      stackHeader={params.stackHeader}
    />
  )
}

/**
 * A full-width centered column component
 * @param {React.ReactNode} children - content to render inside column 
 */
export function WLCenteredColumn(props) {
  return (
    <div className="w-100 d-flex flex-column align-items-center justify-content-center">
      {props.children}
    </div>
  )
}

/**
 * A loading indicator
 */
export function WLLoading() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center gap-2 vh-100">
      <Loading size="lg" color="primary" />
      <Text size="$lg">
        Loading...
      </Text>
    </div>
  )
}

/**
 * A page that renders a spinner until all dependencies are resolved
 * @param {boolean[]} dependencies - displays spinner until all dependencies are true
 * @param {boolean} itemsCentered - whether to center items
 * @param {React.ReactNode} children - content to render inside of screen
 */
export function WLSpinnerPage(props) {

  /** Check if all dependencies are resolved */
  function getDependenciesLoaded() {
    for (const dep of props.dependencies) {
      if (!dep) {
        return dep;
      }
    }
    return true;
  }
  
  return (
    <div className={"d-flex flex-column w-100 align-items-center"}>
      { !getDependenciesLoaded() && <WLLoading /> }
      <div className={`d-${getDependenciesLoaded() ? "flex" : "none"} flex-column ` + props.itemsCentered ? "w-100 align-items-center" : ""}>
        { props.children }
      </div>
    </div>
  )
}
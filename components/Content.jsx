import React, { Component, useState } from "react";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { getChildrenList } from "../api/reactQuirks";

import "../assets/style/content.css";
import { getLargestNumber } from "../api/math";
import { Button, IconButton, Pagination } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

/**
 * @param {boolean} autoPlay - whether to autoplay the carousel
 * @param {string} inlineWidth - width to display carousel as inline
 * @param {boolean} buttonBlock - whether to display block buttons
 * @param {number} buttonSpacing - distance between inline buttons
 * @param {string} buttonSize - size of inline buttons
 * @default
 * autoPlay = false;
 * infinute = true;
 * buttonBlock = false;
 * buttonSpacing = 20;
 */
export function WLAliceCarousel(props) { 
    
  const [activeIndex, setActiveIndex] = useState(0);

  const slidePrev = () => setActiveIndex(activeIndex !== 0 ? activeIndex - 1 : (props.breakpoints ? activeIndex : props.items.length - 1));
  const slideNext = () => setActiveIndex(activeIndex !== props.items.length - 1 ? activeIndex + 1 : (props.breakpoints ? activeIndex : 0));
  const syncActiveIndex = ({ item }) => setActiveIndex(item);
  
  const createItems = (length, [handleClick]) => {
    let deltaX = 0;
    let difference = 0;
    const swipeDelta = 20;

    return props.items.map((item, i) => (
        <div
            key={i}
            data-value={i + 1}
            className="item"
            style={{
              borderColor: props.underlineColor ? props.underlineColor : "transparent",
            }}
            onMouseDown={(e) => (deltaX = e.pageX)}
            onMouseUp={(e) => (difference = Math.abs(e.pageX - deltaX))}
            onClick={() => (difference < swipeDelta) && handleClick(i)}
        >
        <div className={"item-inner " + props.underLineColor ? "underline-color" : ""} >
          {item}
        </div>
        </div>
    ));
  };
  
  const [items] = useState(createItems(5, [setActiveIndex]));

  function getLeftButton() {
    if (props.leftButton) {
      return props.leftButton;
    }
    if (props.buttonBlock) {
      return <Button variant="outlined" style={{minWidth: 100}} color={props.buttonColor ? props.buttonColor : "inherit"} onClick={slidePrev}>Previous</Button>;
    }
    return <IconButton sx={{backgroundColor: "#494949", color: "white", filter: "drop-shadow(1px 1px 3px rgba(0,0,0,0.5))"}} size={props.buttonSize ? props.buttonSize : "large"} style={{marginInline: props.buttonSpacing ? props.buttonSpacing / 2 : 10}}><ChevronLeftIcon /></IconButton>;
  }

  function getRightButton() {
    if (props.leftButton) {
      return props.leftButton;
    }
    if (props.buttonBlock) {
      return <Button variant="outlined" style={{minWidth: 100}} color={props.buttonColor ? props.buttonColor : "inherit"} onClick={slideNext}>Next</Button>;
    }
    return <IconButton sx={{backgroundColor: "#494949", color: "white", filter: "drop-shadow(1px 1px 3px rgba(0,0,0,0.5))"}} size={props.buttonSize ? props.buttonSize : "large"} style={{marginInline: props.buttonSpacing ? props.buttonSpacing / 2 : 10}}><ChevronRightIcon /></IconButton>;
  }
  
  if (props.inlineWidth) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" >
        <div className="d-flex flex-row align-items-center justify-content-between" style={{zIndex: 2, position: "absolute", width: "100%", maxWidth: props.buttonSpacingInline ? props.buttonSpacingInline : props.inlineWidth}}>
          { !props.pagination && <div className="d-flex" onClick={slidePrev}>{ getLeftButton() }</div> }
          { !props.pagination && <div className="d-flex" onClick={slideNext}>{ getRightButton() }</div> }
        </div>
        <div className="d-flex" style={{width: props.inlineWidth, maxWidth: props.inlineWidth}}>
          <AliceCarousel
            mouseTracking
            disableDotsControls
            controlsStrategy="alternate"
            disableButtonsControls
            autoplay={props.autoPlay}
            items={items}
            responsive={props.breakpoints}
            activeIndex={activeIndex}
            onSlideChanged={syncActiveIndex}
          />
        </div>
        { props.pagination && <Pagination hideNextButton hidePrevButton count={props.items.length} page={activeIndex + 1} onChange={(e, v) => { setActiveIndex(v - 1)}} /> }
      </div>
    )
  }

  return [
    <AliceCarousel
      mouseTracking
      disableDotsControls
      controlsStrategy="alternate"
      disableButtonsControls
      autoplay={props.autoPlay}
      items={items}
      responsive={props.breakpoints}
      activeIndex={activeIndex}
      onSlideChanged={syncActiveIndex}
    />,
    <div className="b-refs-buttons d-flex flex-row gap-10">
        { !props.pagination && <div className="d-inline" onClick={slidePrev}>{ getLeftButton() }</div> }
        { !props.pagination && <div className="d-inline" onClick={slideNext}>{ getRightButton() }</div> }
    </div>,
    <div>      
      { props.pagination && <Pagination count={props.items.length} page={activeIndex + 1} onChange={(e, v) => { setActiveIndex(v - 1)}} /> }
    </div>
  ]
}

export function WLAliceCarouselItem(props) {
  
  function handleDragStart(e) {
    e.preventDefault();
  }

  return (
    <div onDragStart={handleDragStart}>
      {props.children}
    </div>
  )
}



export function createCarouselBreakpoints(itemsBase, itemsSm, itemsMd, itemsLg, itemsXl, itemsXxl) {

  const returnBase = itemsBase ? itemsBase : 1; 
  const returnSmall = itemsSm ? itemsSm : getLargestNumber([itemsSm]);
  const returnMd = itemsMd ? itemsMd : getLargestNumber([itemsSm, itemsMd]);
  const returnLg = itemsLg ? itemsLg : getLargestNumber([itemsSm, itemsMd, itemsLg]);
  const returnXl = itemsXl ? itemsXl : getLargestNumber([itemsSm, itemsMd, itemsLg, itemsXl]);
  const returnXxl = itemsXxl ? itemsXxl : getLargestNumber([itemsSm, itemsMd, itemsLg, itemsXl, itemsXxl]);

  return {
    0: { items: returnBase, itemsFit:"contain" },
    576: { items: returnSmall, itemsFit:"contain" },  // sm
    768: { items: returnMd, itemsFit:"contain" },  // md
    992: { items: returnLg, itemsFit:"contain" },  // lg
    1200: { items: returnXl, itemsFit:"contain" }, // xl
    1400: { items: returnXxl, itemsFit:"contain" }, // xxl
  };
}
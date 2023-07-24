import React, { Component, useEffect, useState } from "react";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { getChildrenList } from "../api/reactQuirks";

import "../assets/style/content.css";
import { getLargestNumber } from "../api/math";
import { Button, IconButton, Pagination } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Text } from "@nextui-org/react";

/**
 * @param {boolean} autoPlay - autoplay timer setting
 * @param {string} inlineWidth - width to display carousel as inline
 * @param {boolean} buttonBlock - whether to display block buttons
 * @param {number} buttonSpacing - distance between inline buttons
 * @param {string} buttonSize - size of inline buttons
 * @param {string} backgroundColor - background color of carousel (not pagination)
 * @param {string} controlsStrategy - set a strategy for gallery controls (default, alternate, or responsive)
 * @param {boolean} forceButtons - show buttons even when pagination is enabled
 * @param {boolean} scaleActive - whether to scale down un-targeted elements
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
  
  const [items, setItems] = useState([]);

  useEffect(() => {

    const createItems = ([handleClick]) => {
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
            <div className={"item-inner " + (props.underlineColor ? "underline-color " : "") + (props.scaleActive ? "scale-active " : "")} >
              {item}
            </div>
          </div>
      ));
    };

    setItems(createItems([setActiveIndex]));
  }, [props.items, props.underlineColor, props.scaleActive]);

  function getLeftButton() {
    if (props.leftButton) {
      return props.leftButton;
    }
    if (props.buttonBlock) {
      return <Button variant="outlined" style={{minWidth: 100}} color={props.buttonColor ? props.buttonColor : "inherit"} onClick={slidePrev}>Previous</Button>;
    }
    return <div className="carousel-button" style={{color: "white", filter: "drop-shadow(1px 1px 3px rgba(0,0,0,0.5))", marginInline: props.buttonSpacing ? props.buttonSpacing / 2 : 10}}><ChevronLeftIcon fontSize="large" /></div>;
  }

  function getRightButton() {
    if (props.leftButton) {
      return props.leftButton;
    }
    if (props.buttonBlock) {
      return <Button variant="outlined" style={{minWidth: 100}} color={props.buttonColor ? props.buttonColor : "inherit"} onClick={slideNext}>Next</Button>;
    }
    return <div className="carousel-button" style={{color: "white", filter: "drop-shadow(1px 1px 3px rgba(0,0,0,0.5))", marginInline: props.buttonSpacing ? props.buttonSpacing / 2 : 10}}><ChevronRightIcon fontSize="large" /></div>;
  }
  
  if (props.inlineWidth) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" >
        { props.pagination && props.paginationTop && <Pagination hideNextButton={props.autoPlay} hidePrevButton={props.autoPlay} count={props.items.length} page={activeIndex + 1} onChange={(e, v) => { setActiveIndex(v - 1)}} /> }
        <div className="d-flex flex-row align-items-center justify-content-between" style={{zIndex: 2, position: "absolute", width: "100%", maxWidth: props.buttonSpacingInline ? props.buttonSpacingInline : props.inlineWidth}}>
          { (!props.pagination || props.forceButtons) && <div className="d-flex" onClick={slidePrev}>{ getLeftButton() }</div> }
          { (!props.pagination || props.forceButtons) && <div className="d-flex" onClick={slideNext}>{ getRightButton() }</div> }
        </div>
        <div className="d-flex" style={{width: props.inlineWidth, maxWidth: props.inlineWidth}}>
          <AliceCarousel
            style={{backgroundColor: props.backgroundColor}}
            mouseTracking
            disableDotsControls
            autoHeight={props.autoHeight}
            controlsStrategy={props.controlsStrategy ? props.controlsStrategy : "alternate"}
            disableButtonsControls
            infinite={props.autoPlay}
            autoPlay={props.autoPlay}
            autoPlayInterval={props.autoPlay}
            items={items}
            responsive={props.breakpoints}
            activeIndex={!props.autoPlay ? activeIndex : null}
            onSlideChanged={syncActiveIndex}
          />
        </div>
        { props.pagination && !props.paginationTop && <Pagination hideNextButton={props.autoPlay} hidePrevButton={props.autoPlay} count={props.items.length} page={activeIndex + 1} onChange={(e, v) => { setActiveIndex(v - 1)}} /> }
      </div>
    )
  }

  return [
    <div>      
      { props.pagination && props.paginationTop && <Pagination hideNextButton={props.autoPlay} hidePrevButton={props.autoPlay} count={props.items.length} page={activeIndex + 1} onChange={(e, v) => { setActiveIndex(v - 1)}} /> }
    </div>,
    <AliceCarousel
      style={{backgroundColor: props.backgroundColor}}
      mouseTracking
      autoHeight={props.autoHeight}
      disableDotsControls
      controlsStrategy={props.controlsStrategy ? props.controlsStrategy : "alternate"}
      disableButtonsControls
      infinite={props.autoPlay}
      autoPlay={props.autoPlay}
      autoPlayInterval={props.autoPlay}
      items={items}
      responsive={props.breakpoints}
      activeIndex={!props.autoPlay ? activeIndex : null}
      onSlideChanged={syncActiveIndex}
    />,
    <div className="b-refs-buttons d-flex flex-row gap-10 my-2">
        { (!props.pagination || props.forceButtons) && <div className="d-inline" onClick={slidePrev}>{ getLeftButton() }</div> }
        { (!props.pagination || props.forceButtons) && <div className="d-inline" onClick={slideNext}>{ getRightButton() }</div> }
    </div>,
    <div>      
      { props.pagination && !props.paginationTop && <Pagination hideNextButton={props.autoPlay} hidePrevButton={props.autoPlay} count={props.items.length} page={activeIndex + 1} onChange={(e, v) => { setActiveIndex(v - 1)}} /> }
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
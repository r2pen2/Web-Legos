import React, { Component } from "react";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

export class WLAliceCarousel extends Component { 

  static Item(props) {

    function handleDragStart(e) {
      e.preventDefault();
    }

    return <div onDragStart={handleDragStart}>{props.children}</div>
  }

  render() {

    let children = []; 		React.Children.forEach(this.props.children, function(child) { 			children.push(child); 	});

    return <AliceCarousel mouseTracking items={children} />
  }
}
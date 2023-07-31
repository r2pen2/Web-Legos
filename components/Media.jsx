import "../assets/style/media.css";

import React from "react";

export function WLYoutubeEmbed(props) {
  return (
    <div className="d-flex flex-column w-100 justify-content-center align-items-center">
      <div className="web-legos-video-responsive" style={{maxWidth: props.maxWidth}}>
        {props.children}
      </div>
    </div>
  );
}
import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./HoverVideo.css";
import { CSSTransition } from "react-transition-group";

function HoverVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsPlaying(true)}
      onMouseLeave={() => setIsPlaying(false)}
      className="video-container"
    >
      <CSSTransition
        in={!isPlaying}
        timeout={250}
        classNames="fade"
        unmountOnExit
      >
        <div className={`image-container ${!isPlaying ? "show-overlay" : ""}`}>
          <img
            src="https://images.tkbcdn.com/2/614/350/ts/ds/c0/88/dd/d37828cce5e5882f744cb14650665544.png"
            alt="video placeholder"
            width="100%"
            height="100%"
          />
          <div className="overlay"></div>
        </div>
      </CSSTransition>
      <CSSTransition
        in={isPlaying}
        timeout={250}
        classNames="fade"
        unmountOnExit
      >
        <ReactPlayer
          url="https://salt.tkbcdn.com/ts/ds/47/28/69/5b156cdaaa810f9c37458eb1ab58342d.mp4"
          playing={true}
          loop={true}
          muted={true}
          width="100%"
          height="100%"
        />
      </CSSTransition>
    </div>
  );
}

export default HoverVideoPlayer;

import React from 'react';
import './slider.css';


function Slider() {
  return (
    <>
      <div className="slideshow">
        <div className="slideshow-image" style={{ backgroundImage: "url('./imgs/1.jpg')" }} />
        <div className="slideshow-image" style={{ backgroundImage: "url('./imgs/2.jpg')" }} />
        <div className="slideshow-image" style={{ backgroundImage: "url('./imgs/6.jpg')" }} />
        <div className="slideshow-image" style={{ backgroundImage: "url('./imgs/8.jpg')" }} />
      </div>
    </>
  );
}

export default Slider;

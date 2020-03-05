import React from 'react';
import './slider.css';


function Slider() {
  return (
    <>
   

<div className="slideshow">
  {/* <img className="slideshow-image" src="/imgs/elevate-KJzrLIfq2Zo-unsplash.jpg"></img>
  <img className="slideshow-image" src="/imgs/elevate-UoPNA8I-_p0-unsplash.jpg"></img>

  <img className="slideshow-image" src="/imgs/jinsoo-choi-Ydp9jXqr1cI-unsplash.jpg"></img>

  <img className="slideshow-image" src="/imgs/john-arano-_qADvinJi20-unsplash.jpg"></img>

  <img className="slideshow-image" src="/imgs/john-fornander-SiKzrE3ywSc-unsplash.jpg"></img> */}

<div className="slideshow-image" style={{backgroundImage: "url('./imgs/1.jpg')"}}></div>
  <div className="slideshow-image" style={{backgroundImage: "url('./imgs/2.jpg')"}}></div>
  <div className="slideshow-image" style={{backgroundImage: "url('./imgs/6.jpg')"}}></div> 
  <div className="slideshow-image" style={{backgroundImage: "url('./imgs/8.jpg')"}}></div>



</div>
  
</>
  );
}

export default Slider

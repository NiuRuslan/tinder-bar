import React, { Component, Fragment } from "react";

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";

import styles from './GoogleMapStyles.json'

class Map extends Component{

    // static defaultProps = {
    //     googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD1nvf5ES5KOcnyTJy8JKYPnL2wzmssyDE&v=3.exp&libraries=geometry,drawing,places",
    // }
    static defaultProps = {
      googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyD1nvf5ES5KOcnyTJy8JKYPnL2wzmssyDE&center=47.67355098289096,-122.34473466174701&zoom=15&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x1d2c4d&style=element:labels.text.fill%7Ccolor:0x8ec3b9&style=element:labels.text.stroke%7Ccolor:0x1a3646&style=feature:administrative.country%7Celement:geometry.stroke%7Ccolor:0x4b6878&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0x64779e&style=feature:administrative.province%7Celement:geometry.stroke%7Ccolor:0x4b6878&style=feature:landscape.man_made%7Celement:geometry.stroke%7Ccolor:0x334e87&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0x023e58&style=feature:poi%7Celement:geometry%7Ccolor:0x283d6a&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x6f9ba5&style=feature:poi%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0x023e58&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x3C7680&style=feature:road%7Celement:geometry%7Ccolor:0x304a7d&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:road%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:road.highway%7Celement:geometry%7Ccolor:0x2c6675&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x255763&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xb0d5ce&style=feature:road.highway%7Celement:labels.text.stroke%7Ccolor:0x023e58&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:transit%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:transit.line%7Celement:geometry.fill%7Ccolor:0x283d6a&style=feature:transit.station%7Celement:geometry%7Ccolor:0x3a4762&style=feature:water%7Celement:geometry%7Ccolor:0x0e1626&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x4e6d70&size=480x360&v=3.exp&libraries=geometry,drawing,places"
  }
//    https://maps.googleapis.com/maps/api/js?key=AIzaSyD1nvf5ES5KOcnyTJy8JKYPnL2wzmssyDE&callback=createMap&&libraries=geometry,places
    constructor(props) {
        super(props);
    }



    CMap = withScriptjs(withGoogleMap(props =>
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: -34.397, lng: 150.644 }}
          defaultOptions={{
            disableDefaultUI: true, // disable default map UI
            draggable: true, // make map draggable
            keyboardShortcuts: false, // disable keyboard shortcuts
            scaleControl: true, // allow scale controle
            scrollwheel: true, // allow scroll wheel
            styles: styles // change default map styles
          }}
        >
            {props.children}
        </GoogleMap>
      ));



    render() {
        return (
            <Fragment >
                <this.CMap 
           
                    googleMapURL={this.props.googleMapURL}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `700px`}} />}
                    mapElement={<div style={{ 
                    height: "45%",
                    width: "55%",
                    border: "2px solid #FFF",
                    borderRadius: "25px", margin: "0 auto",  boxShadow: "10px 10px 8px black"}} />}
                    center= {{ lat: 25.03, lng: 121.6 }} 
               
                >
                    <Marker
                     icon={{ url: "./imgs/cocktails.png" }}
                        position={{ lat: -34.397, lng: 150.644 }}
                    />
                </this.CMap>
            </Fragment>
        );
    }
}


export default Map;

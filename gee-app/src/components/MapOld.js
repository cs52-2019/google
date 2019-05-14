import React from 'react';
import ee from '../ee.js';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDNIlpeolkhtpS4RAIuUA3e386eXhFlkIQ';

// Google Maps and Earth Engine code plucked from: https://github.com/snowcloudasync/react-googleMaps-firebase-functions

class MapOld extends React.Component {
  state = {
    map: null,
    render: false
  }

  checkEEAuth(){
    var token = ee.data.getAuthToken();
    console.log(token);
    if(token){
      this.state.render = true
      // Asynchronously load the Google Maps script, passing in the callback reference
      return;
    }
    setTimeout(this.checkEEAuth.bind(this), 1000);
  }


  componentDidMount() {
    // Connect the initMap() function within this class to the global window context, so Google Maps can invoke it
    window.initMap = this.initMap;

    this.checkEEAuth();
  }

  componentWillReceiveProps(nextProps) {
    this.state.map.setCenter(nextProps.location);
  }

  initMap = () => {
    console.log('Initing map')
    // Options for base Google Maps map
    const mapOptions = {
      center: this.props.location,
      zoom: 14,
      mapTypeId: "hybrid",
      mapTypeControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_BOTTOM
      },
      scaleControl: true,
      streetViewControl: false,
      fullscreenControl: false,
      // disable default point-of-interest info window
      clickableIcons: false
    }
    console.log(this.refs.map)
    this.state.map = new window.google.maps.Map(this.refs.map, mapOptions);

    // this.state.map.addListener("bounds_changed", () => {
    //   let bounds = this.state.map.getBounds();
    //   console.log(bounds);
    // });


    // Earth Engine overlay
    // const image = ee.Image('srtm90_v4');
    // const collection = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CO')
    //   .select('CO_column_number_density')
    //   .filterDate('2018-10-15');
    //
    // console.log(image);
    // console.log(collection);
    //
    // image.getMap({min: 0, max: 1000}, ({mapId, token}) => {
    //   this.loadEEHandler(mapId, token);
    // });
  }

  loadEEHandler = (mapId, token) => {
    const eeMapOptions = {
      getTileUrl: (tile, zoom) => {
        const baseUrl = 'https://earthengine.googleapis.com/map';
        const url = [baseUrl, mapId, zoom, tile.x, tile.y].join('/');
        return `${url}?token=${token}`;
      },
      tileSize: new window.google.maps.Size(256, 256)
    }

    let overlayMapType = new window.google.maps.ImageMapType(eeMapOptions);

    this.state.map.overlayMapTypes.push(overlayMapType);
  };

  render() {
    if(this.state.render){
      // Asynchronously load the Google Maps script, passing in the callback reference
      loadJS(
        `https://maps.googleapis.com/maps/api/js?key=${
            GOOGLE_MAPS_API_KEY
        }&callback=initMap`
      );

      return (
        <div style={{width: '100%', height: '500px'}}>
          <div ref="map" style={{width: '100%', height: '100%'}}/>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default MapOld;

const loadJS = src => {
    let script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.getElementsByTagName("head")[0].appendChild(script);
};

import React from 'react';
import ee from '../ee.js';
// import window from 'global'

// https://earthengine.googleapis.com/map/d4fe9ece09ecb967b2fb3c4145723001/8/234/155?token=fd9947a583a8c3dd18bb1b90a21411b6
// https://earthengine.googleapis.com/map/d4fe9ece09ecb967b2fb3c4145723001/8/234/154?token=fd9947a583a8c3dd18bb1b90a21411b6
// https://earthengine.googleapis.com/map/d4fe9ece09ecb967b2fb3c4145723001/8/234/155?token=fd9947a583a8c3dd18bb1b90a21411b6

const GOOGLE_MAPS_API_KEY = 'AIzaSyDNIlpeolkhtpS4RAIuUA3e386eXhFlkIQ';

const HARDCODED_OVERLAYS = {
  co: {
    mapid: "dee1002c53d894891cbd3561b94b2d28",
    token: "b0502f0edca6589a1eb345c45e1c4081"
  },
  no2: {
    mapid: "f3c92c2a304aff5fc585b728b26555d4",
    token: "7f2305ff09bde8888add6c6553cfdad6"
  }
}

// Google Maps and Earth Engine code plucked from: https://github.com/snowcloudasync/react-googleMaps-firebase-functions

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
    }
    this.map = null;
    this.google = null;
    this.loadedGMapsJS = false;
  }

  waitForEEAuth() {
    var token = ee.data.getAuthToken();
    // console.log(`EE token: ${token}`);
    if (token) {
      console.log("Done waiting for EE authentication.")
      this.setState({render: true});
      loadJS(
        `https://maps.googleapis.com/maps/api/js?key=${
            GOOGLE_MAPS_API_KEY
        }&callback=initMap`
      );
      return;
    }
    setTimeout(this.waitForEEAuth.bind(this), 1000);
  }

  componentDidMount() {
    // Connect the initMap() function within this class to the global window context, so Google Maps can invoke it
    window.initMap = this.initMap;

    // Wait for client-side EE authentication to go through
    this.waitForEEAuth();
  }

  initMap = () => {
    console.log('Google Maps callback returned. Initing map.')
    // Options for base Google Maps map
    const mapOptions = {
      center: this.props.location,
      zoom: this.props.zoom,
      mapTypeId: "hybrid",
      mapTypeControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_BOTTOM
      },
      scaleControl: true,
      streetViewControl: false,
      fullscreenControl: false,
      clickableIcons: false
    }
    this.map = new window.google.maps.Map(document.getElementById("map"), mapOptions);
    console.log(this.map);

    this.map.addListener("idle", () => {
      var bounds = this.map.getBounds();

      this.props.onBoundsChange(
        this.map.getCenter(),
        this.map.getZoom(),
        bounds.getNorthEast(),
        bounds.getSouthWest()
      );
    });

    // this.loadEEHandler("d4fe9ece09ecb967b2fb3c4145723001", "8b393c7d898d21ff94146e1f56e3d2e0");
    this.runEEQuery();
  }

  // Construct GET request to fetch EE map tiles
  loadEEHandler(mapInfo) {
    const eeMapOptions = {
      getTileUrl: (tile, zoom) => {
        const baseUrl = 'https://earthengine.googleapis.com/map';
        const url = [baseUrl, mapInfo.mapid, zoom, tile.x, tile.y].join('/');
        console.log(url);
        return `${url}?token=${mapInfo.token}`;
      },
      tileSize: new window.google.maps.Size(256, 256)
    }

    let overlayMapType = new window.google.maps.ImageMapType(eeMapOptions);
    this.map.overlayMapTypes.push(overlayMapType);
  };

  // Create EE query
  runEEQuery = () => {
    if (this.props.filter === "Satellite") return;

    var mapInfo = {};
    if (this.props.filter === "Nitrogen dioxide") mapInfo = HARDCODED_OVERLAYS['no2'];
    if (this.props.filter === "Carbon monoxide") mapInfo = HARDCODED_OVERLAYS['co'];

    // var image = ee.Image('srtm90_v4');
    // console.log(`image: ${image}`);
    //
    // const visParams = {
    //   // bands: ['B5', 'B4', 'B3'],
    //   'min': 0,
    //   'max': 1000,
    //   // gamma: [0.95, 1.1, 1]
    // };

    console.log("GETTING MAP NOW ======");
    console.log(mapInfo);
    this.loadEEHandler(mapInfo);
  }

  render() {
    if(this.state.render) {
      console.log('rerendering');
      // if (!this.loadedGMapsJS) {
        // Asynchronously load the Google Maps script, passing in the callback reference


        // this.loadedGMapsJS = true;
      // }

      return (
        <div style={{width: '100%', height: '500px'}}>
          <div id="map" style={{width: '100%', height: '100%'}}/>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
  }
}

export default Map;

const loadJS = src => {
    let script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.getElementsByTagName("head")[0].appendChild(script);
};

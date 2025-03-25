import { useRef, useEffect } from 'react';
 
import './Map.css';
 
export default function Map(props) {
  const mapRef = useRef();
 
  const { center, zoom } = props;
 
  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      mapId: 'place-detail',
      center: center,
      zoom: zoom,
    });
 
    window.google.maps.importLibrary('marker').then(() => {
      new window.google.maps.marker.AdvancedMarkerElement({
        position: center,
        map: map,
      });
    });
  }, [center, zoom]);
 
  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
}

// import React, { useRef, useEffect } from "react";

// const Map = (props) => {
//   const mapRef = useRef();

//   const { center, zoom } = props;

//   useEffect(() => {
//     const map = new window.google.maps.Map(mapRef.current, {
//       center: center,
//       zoom: zoom,
//     });

//     new window.google.maps.Marker({ position: center, map: map });
//   }, [center, zoom]);

//   return (
//     <div
//       ref={mapRef}
//       className={`map ${props.className}`}
//       style={props.style}
//     ></div>
//   );
// };

// export default Map;


//BELOW SOLUTION IS NOT WORKING

// import React, { useRef, useEffect } from 'react';

// import './Map.css';

// const Map = props => {
//   const mapRef = useRef();

//   const { center, zoom } = props;

//   useEffect(() => {
//     new window.ol.Map({
//       target: mapRef.current.id,
//       layers: [
//         new window.ol.layer.Tile({
//           source: new window.ol.source.OSM()
//         })
//       ],
//       view: new window.ol.View({
//         center: window.ol.proj.fromLonLat([center.lng, center.lat]),
//         zoom: zoom
//       })
//     });
//   }, [center, zoom]);

//   return (
//     <div
//       ref={mapRef}
//       className={`map ${props.className}`}
//       style={props.style}
//       id="map"
//     ></div>
//   );
// };

// export default Map;

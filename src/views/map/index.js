/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import mapboxgl from '!mapbox-gl'

mapboxgl.accessToken =
  'pk.eyJ1IjoiaGFyaXN0cmFja2luZyIsImEiOiJjbGVneWQ3anowanJvM3ZsZDdiNTB2aGk2In0.-YLuxE0bmfGbf8x3GH3n7A'

const Map = props => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-99.29011, 39.39172],
      zoom: 3
    })

    // if (props.pickUpCoordinates) {
    //   addToMap(map, props.pickUpCoordinates)
    // }

    // if (props.dropoffCoordinates) {
    //   addToMap(map, props.dropoffCoordinates)
    // }

    // if (props.pickUpCoordinates && props.dropoffCoordinates) {
    //   map.fitBounds([props.pickUpCoordinates, props.dropoffCoordinates], {
    //     padding: 60
    //   })
    // }
  }, [props.pickUpCoordinates, props.dropoffCoordinates])

  // const addToMap = (map, coordinates) => {
  //   const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
  // }

  return <div id='map'></div>
}

export default Map

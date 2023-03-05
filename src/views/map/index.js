/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from '!mapbox-gl'

mapboxgl.accessToken =
  'pk.eyJ1IjoiaGFyaXN0cmFja2luZyIsImEiOiJjbGVneWQ3anowanJvM3ZsZDdiNTB2aGk2In0.-YLuxE0bmfGbf8x3GH3n7A'

const Map = props => {
  const map = useRef(null)
  const mapContainer = useRef(null)

  const addToMap = (map, coordinates) => {
    const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
  }

  const vehicleCenter = [parseFloat(props.vehiclePosition?.longitude), parseFloat(props.vehiclePosition?.latitude)]
  console.log('vehiclePosition : ', vehicleCenter)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',

      // center: vehicleCenter ? vehicleCenter : props.pickUpCoordinates,
      center: props.pickUpCoordinates,
      zoom: 9
    })

    if (props.pickUpCoordinates) {
      addToMap(map, props.pickUpCoordinates)
    }

    if (props.dropoffCoordinates) {
      addToMap(map, props.dropoffCoordinates)
    }

    if (props.pickUpCoordinates && props.dropoffCoordinates) {
      map.fitBounds([props.pickUpCoordinates, props.dropoffCoordinates], {
        padding: 60
      })
    }
  }, [props.pickUpCoordinates, props.dropoffCoordinates])

  return <div ref={mapContainer} className='map-container' />
}

export default Map

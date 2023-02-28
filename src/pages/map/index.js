import React from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import 'mapbox-gl/dist/mapbox-gl.css'

// import 'react-mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

// ** MUI Imports
import Grid from '@mui/material/Grid'

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiaGFyaXN0cmFja2luZyIsImEiOiJjbGVneWQ3anowanJvM3ZsZDdiNTB2aGk2In0.-YLuxE0bmfGbf8x3GH3n7A'

  // center: [24.461461, 46.44189]
  // zoom: [20]
  // style: 'mapbox://styles/mapbox/navigation-night-v1'
})

const Home = () => {
  return (
    <Grid container>
      <Map
        style='mapbox://styles/mapbox/dark-v11'
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
        center={[46.685396, 24.624972]}
        zoom={[12]}
      >
        <Layer type='symbol' id='marker' layout={{ 'icon-image': 'marker-15' }}>
          <Feature coordinates={[46.685396, 24.624972]} />
        </Layer>
      </Map>
    </Grid>
  )
}

export default Home

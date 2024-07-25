import React from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';


const LocationPin = ({ text }) => (
    <div className="pin">
      <LocationOnIcon sx={{size:"10px"}} />
      <p className="pin-text">{text}</p>
    </div>
  )

const Map = ({ location, zoomLevel }) => (

      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA37v-8jQLFg7Mshd9eQ9gu5F5h3HwOVpg' }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>

  )

  export default Map
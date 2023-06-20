import 'leaflet/dist/leaflet.css'
import { useMemo, useRef } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { Icon } from 'leaflet'
import marker from '../../../assets/vector4.svg'


const myIcon = new Icon({
  iconUrl: marker,
  iconSize: [25, 25],
})

function DraggableMarker({ isCoordinatesChecked, newCoordinates, setNewCoordinates }) {
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setNewCoordinates(marker.getLatLng())
        }
      },
    }),
    [setNewCoordinates]
  )

  return (
    <Marker
      draggable={!isCoordinatesChecked}
      eventHandlers={eventHandlers}
      position={newCoordinates}
      ref={markerRef}
      icon={myIcon}
    ></Marker>
  )
}

const AddressPlace = ({ newCoordinates, setNewCoordinates, isCoordinatesChecked }) => {
  return (
    <MapContainer
      style={{
        height: '400px',
        width: '100%',
      }}
      center={newCoordinates}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <DraggableMarker
        isCoordinatesChecked={isCoordinatesChecked}
        setNewCoordinates={setNewCoordinates}
        newCoordinates={newCoordinates}
      />
    </MapContainer>
  )
}

export default AddressPlace

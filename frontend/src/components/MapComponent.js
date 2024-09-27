import React, { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  ZoomControl,
  useMap,
  Popup,
} from "react-leaflet"
import L from "leaflet"
import Popups from "./Popups"
import { setVisible } from "../store/algeria"
import "leaflet/dist/leaflet.css"

// Custom marker icon configuration
const customIcon = L.icon({
  iconUrl: "marker-icon.png",
  iconSize: [48, 72],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
  shadowUrl: "marker-icon-shadow.png",
  shadowSize: [48, 72],
  shadowAnchor: [19, 37],
})

// Component to handle fly-to animation for the map
const FlyToLocation = ({ position, zoom }) => {
  const map = useMap()
  useEffect(() => {
    if (position && zoom) {
      map.flyTo(position, zoom, { duration: 2 })
    }
  }, [position, zoom])
  return null
}

const MapComponent = ({
  geoData,
  style,
  flyToPosition,
  initZoom,
  featureLayers,
  code,
  wilayaName,
  tamazight,
}) => {
  const popupRef = useRef()
  const dispatch = useDispatch()

  const visible = useSelector((state) => state.algeria.visible)
  const markerPosition = useSelector((state) => state.algeria.markerPosition)

  // Add event listeners for popup animations
  useEffect(() => {
    const map = document.querySelector(".leaflet-container")

    map.addEventListener("popupopen", (e) => {
      const popupElement = e.target.querySelector(".leaflet-popup")
      if (popupElement) {
        popupElement.classList.add("fade-in")
      }
    })
  }, [])

  // Handle each feature in GeoJSON data
  const onEachFeature = (feature, layer) => {
    layer.on("add", () => {
      const polygonElement = layer.getElement()
      if (polygonElement) {
        polygonElement.classList.add("fade-in")
      }
    })

    layer.on({
      click: (e) => {
        // Add any custom logic for feature click events if needed
      },
      loading: resetHighlight,
    })

    featureLayers.current.push(layer)
  }

  // Reset highlight for all layers
  const resetHighlight = () => {
    dispatch(setVisible(false))
    featureLayers.current.forEach((layer) => {
      layer.setStyle({ opacity: 1, fillOpacity: 1 })
    })
  }

  // Open popup when marker position is updated and visible
  useEffect(() => {
    if (popupRef.current && visible) {
      popupRef.current.openOn(popupRef.current._map)
    }
  }, [markerPosition, visible])

  return (
    <MapContainer
      center={[28.0339, -11]}
      zoom={initZoom}
      maxZoom={6}
      minZoom={5}
      style={{ height: "100vh", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <GeoJSON data={geoData} style={style} onEachFeature={onEachFeature} />

      <ZoomControl position="topright" />
      <FlyToLocation position={flyToPosition} zoom={initZoom} />

      {visible && markerPosition?.[0] && (
        <Popup position={markerPosition} ref={popupRef}>
          <Popups
            visible={visible}
            imagePath={`images/${code}.jpg`}
            wilayaName={wilayaName}
            tamazight={tamazight}
          />
        </Popup>
      )}
    </MapContainer>
  )
}

export default MapComponent

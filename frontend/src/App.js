import React, { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import * as turf from "@turf/turf"
import {
  setMsgError,
  setMarkerPosition,
  setVisible,
  setAreaInSquare,
  setSubMenu,
  setUpdateValue,
  setLoading,
} from "./store/algeria"
import getMunicipalities from "./hooks/useMunicipalities"
import useFilteredData from "./hooks/useFilteredData"
import useGeoData from "./hooks/useGeoData"
import MapComponent from "./components/MapComponent"
import Menu from "./components/Menu"
import { style } from "./styles/styles"
import "leaflet/dist/leaflet.css"
import "semantic-ui-css/semantic.min.css"
import SubMenu from "./components/SubMenu"

function App() {
  const dispatch = useDispatch()
  const featureLayers = useRef([])

  // State Management
  const [code, setCode] = useState("08")
  const [wilayaName, setWilayaName] = useState("")
  const [wilayaTamazight, setWilayaTamazight] = useState("")
  const [flyToPosition, setFlyToPosition] = useState(null)
  const [initZoom, setInitZoom] = useState(5)
  const [municipalities, setMunicipalities] = useState([])

  // Redux Selectors
  const searchTerm = useSelector((state) => state.algeria.inputValue)
  const subMenu = useSelector((state) => state.algeria.subMenu)

  const searchTermLower = searchTerm.toLowerCase()

  // Hooks
  const { dataTarget } = useFilteredData(searchTermLower)
  const { geoData } = useGeoData()

  // Constants
  const initPosition = [28.46, -13.18]

  // Function to target and style a specific layer based on search result
  const targetLayer = (newLayer) => {
    if (!newLayer?.feature) return

    setTimeout(() => {
      featureLayers.current.forEach((layer) => {
        const isSelected = layer.feature === newLayer.feature

        layer.setStyle({
          opacity: isSelected ? 1 : 0.1,
          fillOpacity: isSelected ? 1 : 0.1,
          fill: "#dfe6e9",
        })

        if (isSelected && layer._bounds) {
          const center = layer._bounds.getCenter()
          dispatch(setMarkerPosition([center.lat, center.lng]))
          dispatch(
            setAreaInSquare(Math.round(turf.area(layer.feature) / 600000))
          )
          dispatch(setVisible(true))
        }
      })
      dispatch(setLoading(false))
    }, 2000)
    dispatch(setLoading(true))
  }

  // Function to find layer by wilaya code
  const getLayerByCode = (layers, code) =>
    layers.find((layer) => layer?.feature?.properties?.code?.includes(code))

  // useEffect to fetch municipalities based on subMenu state

  const fetchMunicipalities = async () => {
    const municipalities = await getMunicipalities(
      featureLayers,
      searchTerm,
      dispatch,
      dataTarget,
      setSubMenu
    )
    setMunicipalities(municipalities)
  }

  const handleFlyTo = async () => {
    try {
      const { center, zoom, code, wilaya, tamazight } = dataTarget?.[0] || {}
      const selectedLayer = getLayerByCode(featureLayers.current, code)

      if (!selectedLayer) {
        // console.log("subMenu:", subMenu)
        dispatch(setSubMenu(false))
        // console.log("subMenu:", subMenu)
      }
      // Dispatch necessary actions and update state
      dispatch(setVisible(false))
      setFlyToPosition(center)
      setInitZoom(zoom)
      setCode(code)
      setWilayaName(wilaya)
      setWilayaTamazight(tamazight)

      // Set the target layer
      targetLayer(selectedLayer)

      // dispatch(setSubMenu(true))
      if (dataTarget) {
        fetchMunicipalities()
        dispatch(setSubMenu(true))
      }
      console.log(subMenu)
    } catch (error) {
      console.log("error:", error)
      dispatch(setMsgError(true))
      dispatch(setSubMenu(false))
    }
  }

  // Handler to reset map to the initial state
  const handleFlyToInit = () => {
    setFlyToPosition(initPosition)
    setInitZoom(5)
    featureLayers.current.forEach((layer) => {
      layer.setStyle({ opacity: 0.1, fillOpacity: 0.1 })
    })

    dispatch(setVisible(false))
    dispatch(setSubMenu(false))
    dispatch(setMsgError(false))
    dispatch(setUpdateValue(""))
    setMunicipalities([])
  }

  return (
    <div className="App">
      <Menu onFlyTo={handleFlyTo} onFlyToInit={handleFlyToInit} />
      {dataTarget[0] && <SubMenu renderMunicipalities={municipalities} />}

      {geoData && (
        <MapComponent
          geoData={geoData}
          style={style}
          flyToPosition={flyToPosition}
          initZoom={initZoom}
          featureLayers={featureLayers}
          code={code}
          wilayaName={wilayaName}
          tamazight={wilayaTamazight}
        />
      )}
    </div>
  )
}

export default App

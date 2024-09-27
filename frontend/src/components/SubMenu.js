/* eslint-disable */
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SemanticToastContainer } from "react-semantic-toasts"

import { setSubMenu, setLoading } from "../store/algeria"
import {
  Segment,
  Divider,
  Transition,
  Message,
  Dimmer,
  Loader,
  Image,
} from "semantic-ui-react"

import { subMenuStyle, subLoading } from "../styles/styles"

const colors = [
  "red",
  "orange",
  "yellow",
  "olive",
  "green",
  "teal",
  "blue",
  "violet",
  "purple",
  "pink",
  "brown",
]

const SubMenu = ({ renderMunicipalities }) => {
  const dispatch = useDispatch()
  const subMenuVisible = useSelector((state) => state.algeria.subMenu)
  const inputValue = useSelector((state) => state.algeria.inputValue)

  const loading = useSelector((state) => state.algeria.loading)

  // Random color generator
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
  }

  // Handle the visibility and loading state
  useEffect(() => {
    if (renderMunicipalities && renderMunicipalities.length === 0) {
      dispatch(setSubMenu(false))
    } else {
      dispatch(setSubMenu(true))
      // Simulate a loading delay
      const timer = setTimeout(() =>   dispatch(setLoading((false))), 1000) // 1 second delay
      return () => clearTimeout(timer) // Cleanup on unmount
    }
  }, [])

  // Render the loader while loading is true
  if (loading) {
    return (
      <Transition visible={subMenuVisible} animation="fade up" duration={600}>
        <Segment style={subLoading}>
          <Dimmer active inverted>
            <Loader size="medium">Loading</Loader>
          </Dimmer>
          <Image src="./paragraph.png" />
        </Segment>
      </Transition>
    )
  }

  // Render the actual content after the loading is done
  return (
    subMenuVisible && (
      <div className="tool-group bg-light" id="toolGroup">
        <Transition visible={subMenuVisible} animation="fade up" duration={600}>
          <Segment style={subMenuStyle}>
            <span>Municipalities | Communes</span>
            <Divider />
            {renderMunicipalities &&
              renderMunicipalities.map((municipalitie) => (
                <Message color={getRandomColor()} key={municipalitie.code} >
                  {municipalitie.commune}
                </Message>
              ))}
            <Divider />
          </Segment>
        </Transition>
        <SemanticToastContainer />
      </div>
    )
  )
}

export default SubMenu

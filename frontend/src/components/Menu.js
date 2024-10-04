/* eslint-disable */
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SemanticToastContainer } from "react-semantic-toasts"
import { setUpdateValue, setMsgError, setVisibleBtn } from "../store/algeria"

import {
  Segment,
  Divider,
  Button,
  Transition,
  Flag,
  FormField,
  Form,
  ButtonContent,
  Icon,
  Message,
  Input,
} from "semantic-ui-react"

import {
  segmentStyle,
  segmentStyleBtn,
  btnStyle,
  icons,
  iconsDown,
  btnCenter,
} from "../styles/styles"

const Menu = ({ onFlyTo, onFlyToInit }) => {
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const msgError = useSelector((state) => state.algeria.msgError)
  const searchTerm = useSelector((state) => state.algeria.inputValue)
  const municipalities = useSelector((state) => state.algeria.municipalities)
  const visible = useSelector((state) => state.algeria.visibleBtn)
  

  useEffect(() => {
    if (searchTerm !== "" && municipalities) {
      setLoading(true)
    }
  }, [loading])

  // Toggle visibility of the menu
  const toggleVisibility = () => dispatch(setVisibleBtn(!visible))

  // Handle input change and update the state
  const handleChange = (e) => {
    dispatch(setUpdateValue(e.target.value))
    dispatch(setMsgError(false))
  }

  return (
    <div className="tool-group bg-light" id="toolGroup">
      <Segment style={segmentStyleBtn}>
        <div
          className="ui animated fade button"
          onClick={toggleVisibility}
          style={btnStyle}
        >
          <i className="low vision icon" style={icons} />
          <div className="visible content">
            <Flag name="dz" />
            Algeria
          </div>
          <i className="sitemap icon" style={iconsDown} />
        </div>
        <Divider hidden />
      </Segment>

      <Transition visible={visible} animation="fade up" duration={600}>
        <Segment style={segmentStyle}>
          <div>
            <Form>
              <FormField>
                <label>Wilaya</label>
                <Input
                  loading={loading}
                  icon="search"
                  placeholder="08, Bechar, ⴱⴻⵛⵀⴰⵔ, بشار"
                  onChange={handleChange}
                  value={searchTerm}
                />
              </FormField>
              <Button type="submit" animated primary fluid onClick={onFlyTo}>
                <ButtonContent visible>Search</ButtonContent>
                <ButtonContent hidden>
                  <Icon name="arrow right" />
                </ButtonContent>
              </Button>
            </Form>

            {msgError && (
              <Message
                warning
                header="Invalid code or wilaya name!"
                content="Please try something like: 08, Bechar, ⴱⴻⵛⵀⴰⵔ, بشار"
              />
            )}

            <Divider />

            <div className="mt2" style={btnCenter}>
              <Button
                icon="refresh"
                size="large"
                onClick={onFlyToInit}
                disabled={false}
                fluid
              />
            </div>
          </div>
        </Segment>
      </Transition>

      <SemanticToastContainer position="bottom-center" />
    </div>
  )
}

export default Menu

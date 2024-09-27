import React from "react"
import { useSelector } from "react-redux"
import useFetchImage from "../hooks/useFetchImage"
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  Transition,
  Dimmer,
  Loader,
  Image,
  Segment,
  Label,
  Icon,
} from "semantic-ui-react"

const Popups = ({ visible, imagePath, wilayaName, tamazight }) => {
  const { imageUrl, loading, error } = useFetchImage(imagePath)
  const areaInSquare = useSelector((state) => state.algeria.areaInSquare)

  if (loading) {
    return (
      <Segment>
        <Dimmer active inverted>
          <Loader size="medium">Loading</Loader>
        </Dimmer>
        <Image src="./paragraph.png" />
      </Segment>
    )
  }

  if (error) {
    return <p>Error loading image</p>
  }

  return (
    <Transition visible={visible} animation="fade" duration={500}>
      <Card style={{ minWidth: "265px", minHeight: "309px" }}>
        <Image src={imageUrl} alt="Fetched data" />
        <CardContent>
          <CardHeader>
            <button className="ui big button fluid">
              <span className="ui left floated">{wilayaName}</span>
              <span className="ui right floated">{tamazight}</span>
            </button>
          </CardHeader>
          <CardDescription>
            <Label className="ui big fluid">
              <span className="ui huge">
                <Icon name="move" />
                <span className="right floated">
                  {areaInSquare} km<sup>2</sup>
                </span>
              </span>
            </Label>
            <Label
              className="ui big fluid population"
              style={{ backgroundColor: "#ffa500b0" }}
            >
              <span className="ui huge">
                <Icon name="users" />
                <span className="right floated">Not yet!</span>
              </span>
            </Label>
          </CardDescription>
        </CardContent>
      </Card>
    </Transition>
  )
}

export default Popups

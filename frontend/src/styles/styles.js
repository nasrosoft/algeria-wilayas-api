export const style = (feature) => {
  let fillColor = "#ffffff" // Default color

  // Apply different colors based on the value of a specific property
  switch (feature.properties.code) {
    case "01":
      fillColor = "#fffcbc"

      break
    case "02":
      fillColor = "#FED976"
      break
    case "03":
      fillColor = "#FEB24C"
      break
    case "04":
      fillColor = "#FD8D3C"
      break
    case "05":
      fillColor = "#FC4E2A"
      break
    case "06":
      fillColor = "#E31A1C"
      break
    case "07":
      fillColor = "#c8d6e5"
      break
    case "08":
      fillColor = "#f79656"
      break
    case "09":
      fillColor = "#576574"
      break
    case "10":
      fillColor = "#70a1ff"
      break
    case "11":
      fillColor = "#5352ed"
      break
    case "12":
      fillColor = "#a4b0be"
      break
    case "13":
      fillColor = "#ffa502"
      break
    case "14":
      fillColor = "#eccc68"
      break
    case "15":
      fillColor = "#eccc68"
      break
    case "16":
      fillColor = "#7bed9f"
      break
    case "17":
      fillColor = "#57606f"
      break
    case "18":
      fillColor = "#badc58"
      break
    case "19":
      fillColor = "#f7f1e3"
      break
    case "20":
      fillColor = "#34ace0"
      break
    case "21":
      fillColor = "#33d9b2"
      break
    case "22":
      fillColor = "#ffb142"
      break
    case "23":
      fillColor = "#ff5252"
      break
    case "24":
      fillColor = "#474787"
      break
    case "25":
      fillColor = "#706fd3"
      break
    case "26":
      fillColor = "#34ace0"
      break
    case "27":
      fillColor = "#d1ccc0"
      break
    case "28":
      fillColor = "#2ecc71"
      break
    case "29":
      fillColor = "#3498db"
      break
    case "30":
      fillColor = "#8e44ad"
      break
    case "31":
      fillColor = "#1abc9c"
      break
    case "32":
      fillColor = "#f1c40f"
      break
    case "33":
      fillColor = "#ecf0f1"
      break
    case "34":
      fillColor = "#8e44ad"
      break
    case "35":
      fillColor = "#7f8c8d"
      break
    case "36":
      fillColor = "#0984e3"
      break
    case "37":
      fillColor = "#da2321"
      break
    case "38":
      fillColor = "#d35400"
      break
    case "39":
      fillColor = "#badc58"
      break
    case "40":
      fillColor = "#7ed6df"
      break
    case "41":
      fillColor = "#e056fd"
      break
    case "42":
      fillColor = "#dff9fb"
      break
    case "43":
      fillColor = "#7ed6df"
      break
    case "44":
      fillColor = "#30336b"
      break
    case "45":
      fillColor = "#535c68"
      break
    case "46":
      fillColor = "#ff7979"
      break
    case "47":
      fillColor = "#badc58"
      break
    case "48":
      fillColor = "#f6e58d"
      break
    case "49":
      fillColor = "#fee09b"
      break
    case "50":
      fillColor = "#686de0"
      break
    case "51":
      fillColor = "#5f27cd"
      break
    case "52":
      fillColor = "#54a0ff"
      break
    case "53":
      fillColor = "#00d2d3"
      break
    case "54":
      fillColor = "#1dd1a1"
      break
    case "55":
      fillColor = "#48dbfb"
      break
    case "56":
      fillColor = "#ff6b6b"
      break
    case "57":
      fillColor = "#feca57"
      break
    case "58":
      fillColor = "#ff9ff3"
      break
  }

  return {
    fillColor,
    weight: 1,
    color: "#636e72",
    dashArray: "1",
    fillOpacity: 0.9,
  }
}

export const segmentStyle = {
  zIndex: 997,
  position: "absolute",
  width: "324px",
  top: "47px",
  left: "10px",
  maxHeight: "calc(100vh - 3vw)",
  overflow: "auto",
  padding: "20px",
}

export const subLoading = {
  zIndex: 997,
  position: "absolute",
  width: "324px",
  height: "388px",
  top: "281px",
  left: "10px",
  maxHeight: "calc(100vh - 3vw)",
  overflow: "auto",
  padding: "20px",
}

export const subMenuStyle = {
  zIndex: 997,
  position: "absolute",
  width: "324px",
  height: "388px",
  top: "291px",
  left: "10px",
  maxHeight: "calc(100vh - 3vw)",
  overflow: "auto",
  padding: "20px",
}
export const segmentStyleBtn = {
  zIndex: 999,
  position: "absolute",
  width: "324px",
  top: "10px",
  left: "10px",
  height: "46px",
  padding: "20px",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "white",
}
export const btnStyle = {
  backgroundColor: "white",
  width: "241px",
  marginTop: "-17px",
  height: "41px",
}
export const icons = {
  float: "left",
}
export const iconsDown = {
  float: "right",
  marginTop: "-13px",
}
export const btnCenter = {
  display: "flex",
  justifyContent: "center",
}
export const btnPading = {
  padding: "0 2px",
}

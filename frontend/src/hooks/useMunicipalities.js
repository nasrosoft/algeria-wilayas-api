import axios from "axios"
import { setMsgError, setSubMenu } from "../store/algeria"

const getMunicipalities = async (
  featureLayers,
  searchTerm,
  dispatch,
  dataTarget
) => {
  try {
    const { data: wilayasData } = await axios.get(
      `https://algeria-wilayas-api.onrender.com/wilayas`
    )

    // Find the matching layer based on searchTerm

    const foundLayer = featureLayers.current.find((layer) => {
      console.log("layer.feature.properties", layer.feature.properties)
      const { code, wilayaNameEn, alt_name } = layer.feature.properties
      return (
        code.includes(searchTerm) ||
        wilayaNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alt_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })

    if (!foundLayer) {
      throw new Error("No matching layer found")
    }

    // Find the corresponding wilaya

    if (dataTarget[0]) {
      const focusedWilaya = wilayasData.find(
        (wilaya) => wilaya.code === dataTarget[0].code
      )

      // Filter to get municipalities for the found wilaya
      const municipalities = wilayasData.filter(
        (wilaya) => wilaya.wilaya === focusedWilaya.wilaya
      )

      console.log("com:", municipalities)
      return municipalities
    }
  } catch (error) {
    console.error("Error fetching municipalities:", error.message)
    dispatch(setSubMenu(false))
    dispatch(setMsgError(true)) // Handle error message display
  }
}

export default getMunicipalities

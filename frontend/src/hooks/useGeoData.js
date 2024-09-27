import { useState, useEffect } from "react"
import axios from "axios"

const useGeoData = (imagePath) => {
  const [geoData, setGeoData] = useState(null)
  const [ loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/algeria`)

        setGeoData(response.data)
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }

    fetchGeoData()
  }, [])

  return { geoData, loading, error }
}

export default useGeoData

import { useState, useEffect } from "react"
import axios from "axios"

const useFetchImage = (imagePath) => {
  const [imageUrl, setImageUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Old localhost URL
// const apiUrl = 'http://localhost:3001/algeria';
// Change to the deployed URL
// const apiUrl = 'https://algeria-wilayas-api.onrender.com/algeria';

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`https://algeria-wilayas-api.onrender.com/${imagePath}`, {
          responseType: "blob", // Ensure the response is treated as a binary blob
        })
        const imageUrl = URL.createObjectURL(response.data)
        setImageUrl(imageUrl)
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }

    fetchImage()
  }, [imagePath])

  return { imageUrl, loading, error }
}

export default useFetchImage

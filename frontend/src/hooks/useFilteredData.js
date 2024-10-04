import { useState, useEffect } from "react"
import axios from "axios"

const useFilteredData = (searchTermLower) => {
  const [dataTarget, setDataTarget] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null) // Clear any previous errors
      try {
        const { data } = await axios.get(
          `http://localhost:3001/wilayas`
        )

        const filteredData = data.filter((item) =>
          ["code", "wilaya", "tamazight", "ar"].some((key) =>
            item[key]?.toLowerCase().includes(searchTermLower)
          )
        )

        setDataTarget(filteredData)
      } catch (err) {
        setError("Failed to fetch data")
        console.error("Error:", err)
      } finally {
        setLoading(false)
      }
    }

    if (searchTermLower) {
      fetchData()
    } else {
      setDataTarget([]) // Clear data when search term is empty
    }
  }, [searchTermLower])

  return { dataTarget, loading, error }
}

export default useFilteredData

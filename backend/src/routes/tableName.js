const express = require("express")
const { getAllTableNames } = require("../controllers/employeeController")
const router = express.Router()

router.get("/tables", async (req, res) => {
  console.log("here is")
  try {
    const tables = await getAllTableNames()
    res.status(200).json(tables)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching table names", error: error.message })
  }
})

module.exports = router

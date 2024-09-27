const express = require("express")
const { getGrade } = require("../controllers/employeeController")
const router = express.Router()

router.get("/empGrade", getGrade)

module.exports = router

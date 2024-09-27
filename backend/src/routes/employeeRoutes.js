const express = require("express")
const { getEmployees } = require("../controllers/employeeController")
const router = express.Router()

router.get("/employees", getEmployees)

module.exports = router

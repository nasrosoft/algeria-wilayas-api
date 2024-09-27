const express = require("express")
const { getConnection } = require("../controllers/employeeController")
const router = express.Router()

router.get("/test-db", getConnection)

module.exports = router

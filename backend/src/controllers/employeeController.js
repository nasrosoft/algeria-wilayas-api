const { getAllEmployee } = require("../models/employeeModel")
const { getAllEmployeeGrade } = require("../models/empGradeModel")
const pool = require("../config/db")

const getEmployees = async (req, res) => {
  const { id } = req.params
  try {
    const employees = await getAllEmployee()
    if (!employees) {
      return res.status(404).json({ message: "employees not found" })
    }
    res.json(employees)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getGrade = async (req, res) => {
  const { id } = req.params
  try {
    const employees = await getAllEmployeeGrade()
    if (!employees) {
      return res.status(404).json({ message: "employees not found" })
    }
    const empByGrade = employees.map((cat) => {
      let categorie = cat.cod_gri.replace(/\/.*/, "")
      let codeEmp = cat.code_emp
      switch (true) {
        case categorie >= 21 && categorie <= 29:
          grade = "CADRE SUPERIEUR"
          type = 1
          return { codeEmp, grade, categorie, type }
          break
        case categorie >= 14 && categorie <= 20:
          grade = "CADRE"
          type = 2
          return { codeEmp, grade, categorie, type }
          break
        case categorie >= 10 && categorie <= 13:
          grade = "MAITRISE"
          type = 3
          return { codeEmp, grade, categorie, type }
          break
        case categorie >= 7 && categorie <= 9:
          grade = "EXECUTION"
          type = 4
          return { codeEmp, grade, categorie, type }
          break
        default:
          return "Invalid grade"
      }
    })
    res.json(empByGrade)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getConnection = async (req, res) => {
  try {
    const client = await pool.connect()
    await client.query("SELECT NOW()")
    client.release()
    res.status(200).json({ message: "Database connection successful" })
  } catch (error) {
    console.error("Database connection error:", error)
    res
      .status(500)
      .json({ message: "Database connection failed", error: error.message })
  }
}

const getAllTableNames = async () => {
  try {
    const query = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `
    const res = await pool.query(query)
    console.log("res:", res)
    return res.rows.map((row) => row.table_name)
  } catch (error) {
    console.error("Error fetching table names:", error)
    throw error
  }
}

module.exports = { getEmployees, getConnection, getAllTableNames, getGrade }

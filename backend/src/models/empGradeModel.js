const { pool } = require("../config/db")

const getAllEmployeeGrade = async (id) => {
  const { rows } = await pool.query(
    `SELECT cod_gri, code_emp FROM employe WHERE actif='O'`
  )
  return rows
}

module.exports = { getAllEmployeeGrade }

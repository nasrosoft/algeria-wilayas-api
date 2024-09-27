const { pool } = require("../config/db")

const getAllEmployee = async () => {
  const { rows } = await pool.query(
    `SELECT code_emp, nom, prenom FROM employe WHERE actif='O'`
  )
  console.log(rows.length)
  return rows
}

module.exports = { getAllEmployee }

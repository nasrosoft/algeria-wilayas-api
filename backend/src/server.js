const express = require("express")
const path = require("path")
const cors = require("cors")

const app = express()
const port = process.env.PORT || 3001

// Load data
const wilayas = require("./infrastructure/database/wilayas_fr.json")
const algeria = require("./infrastructure/database/algeria_geojson.json")

// Middleware
app.use(cors())

// Serve static images from the /infrastructure/images folder
app.use(
  "/images",
  express.static(path.join(__dirname, "infrastructure/images"))
)
console.log(
  "Serving images from:",
  path.join(__dirname, "infrastructure/images")
)

// Routes
app.get("/algeria", (req, res) => {
  res.json(algeria)
})

app.get("/wilayas", (req, res) => {
  res.json(wilayas)
})

app.get("/wilayas/:id", (req, res) => {
  const wilaya = wilayas.find((w) => w.code === req.params.id)
  if (wilaya) {
    return res.json(wilaya)
  }
  res.status(404).send("Wilaya not found")
})

// Fallback route for undefined endpoints
app.use((req, res) => {
  res.status(404).send("Resource not found")
})

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

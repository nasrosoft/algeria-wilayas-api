# Algeria Wilayas API

This project provides an interactive map of Algeria's wilayas with additional features like municipality data and area calculations.

## Demo

The live demo of the application can be found here: [algeria-wilayas-api](https://nasrosoft.github.io/algeria-wilayas-api/){:target="_blank"}.

## Features

- Interactive map with clickable wilayas
- Municipality data display
- Fly-to functionality based on search
- Area calculations using GeoJSON and Turf.js

## Technologies

- **Frontend:** React.js, Leaflet, Semantic UI
- **Backend:** Node.js, Express
- **Map Data:** GeoJSON
- **State Management:** Redux

## Installation

To run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/nasrosoft/algeria-wilayas-api.git
   cd algeria-wilayas-api

   ```

2. Install dependencies for both frontend and backend:

   ```bash
   npm install
   ```

   A. npm install
   Start both frontend and backend servers simultaneously:

   ```bash
   npm run dev
   ```

## API Endpoints

- `/algeria`: Provides details of all wilayas and their municipalities.

---

- `/wilayas/id`: Provides details of each wilaya and their respective municipalities.

---

- `/images/id`: Provides images of each wilaya by its postal code (wilaya ID).

---

Feel free to fork the project and submit a pull request!

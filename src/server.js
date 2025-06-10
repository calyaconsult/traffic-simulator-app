const express = require('express');
const cors = require('cors'); // Import the cors package
const generateTrafficData = require('./traffic-generator.js');

const app = express();
// Let's move our API server to a new port
const PORT = 3001;

// --- Middleware ---

// Use the CORS middleware to allow requests from our front-end's origin
// This tells our API that it's okay to accept requests from the page served on port 8080.
app.use(cors({
  origin: 'http://localhost:8080'
}));

// We are REMOVING this line, as your other server is now handling the static files:
// app.use(express.static(path.join(__dirname, '../public')));


// --- API Routes ---
app.get('/api/traffic', (req, res) => {
  console.log(`API request received from origin: ${req.get('origin')}`);

  const trafficData = generateTrafficData();

  if (trafficData) {
    res.json(trafficData);
  } else {
    res.status(500).json({ error: 'Failed to generate traffic data.' });
  }
});


// --- Start the Server ---
app.listen(PORT, '0.0.0.0', () => {
  // The server message now points to our new API port
  console.log(`Node.js API server is running at http://localhost:${PORT}`);
});

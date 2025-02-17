const express = require('express');
const path = require('path');
const cors = require('cors');  // Import cors package
const app = express();

// Enable CORS for the frontend to make requests to the backend (port 4000)
app.use(cors({ origin: 'http://localhost:3000' })); // Adjust the origin if your frontend is hosted elsewhere

// Serve static files (React build files) from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Route to serve the index.html for the root URL
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Route to handle any other requests for the app
app.get('/app', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server on port 9000 (for the giftwebsite)
app.listen(9000, () => {
  console.log('Gift website is running on http://localhost:9000');
});

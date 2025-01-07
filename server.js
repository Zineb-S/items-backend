const express = require('express');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');
const cors = require('cors');
const promClient = require('prom-client');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', itemRoutes);
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

// Expose metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
// Start Server
const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
module.exports = server;
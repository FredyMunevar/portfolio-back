const jsonServer = require("json-server");
const axios = require("axios");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Function to fetch JSON data from GitHub dynamically
async function fetchJson(url, res) {
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(`❌ Error fetching data from ${url}:`, error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}

// Define API routes that fetch data on demand
server.get("/en", (req, res) => {
  fetchJson("https://raw.githubusercontent.com/FredyMunevar/portfolio-back/main/data/en.json", res);
});

server.get("/es", (req, res) => {
  fetchJson("https://raw.githubusercontent.com/FredyMunevar/portfolio-back/main/data/es.json", res);
});

server.get("/projects", (req, res) => {
  fetchJson("https://raw.githubusercontent.com/FredyMunevar/portfolio-back/main/data/projects.json", res);
});

// Root route for debugging
server.get("/", (req, res) => {
  res.send("✅ JSON Server is running on Vercel!");
});

module.exports = server;

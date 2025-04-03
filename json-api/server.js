const jsonServer = require("json-server");
const axios = require("axios");

const server = jsonServer.create();
const router = jsonServer.router({}); // Empty object for now
const middlewares = jsonServer.defaults();

server.use(middlewares);

async function loadData() {
  try {
    const enData = await axios.get("https://raw.githubusercontent.com/FredyMunevar/portfolio-back/main/data/en.json");
    const esData = await axios.get("https://raw.githubusercontent.com/FredyMunevar/portfolio-back/main/data/es.json");
    const projectsData = await axios.get(
      "https://raw.githubusercontent.com/FredyMunevar/portfolio-back/main/data/projects.json"
    );

    // Update the router with fetched data
    const newDb = {
      messages: {
        en: enData.data || {}, // Ensuring default empty object
        es: esData.data || {}, // Ensuring default empty object
      },
      projects: projectsData.data || {},
    };

    // Override default JSON Server router
    server.use("/api", jsonServer.router(newDb));

    console.log("✅ Data loaded successfully!");
  } catch (error) {
    console.error("❌ Error loading data:", error);
  }
}

// Load data before starting the server
loadData();

server.get("/", (req, res) => {
  res.send("✅ JSON Server is running on Vercel!");
});

module.exports = server;

const jsonServer = require("json-server");
const axios = require("axios");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);

async function loadData() {
  try {
    const enData = await axios.get("https://raw.githubusercontent.com/FredyMunevar/portfolio-back/main/data/en.json");
    const esData = await axios.get("https://raw.githubusercontent.com/FredyMunevar/portfolio-back/main/data/es.json");
    const projectsData = await axios.get(
      "https://raw.githubusercontent.com/FredyMunevar/portfolio-back/main/data/projects.json"
    );

    const newDb = {
      en: enData.data || {}, // Ensure valid object
      es: esData.data || {}, // Ensure valid object
      projects: projectsData.data || {},
    };

    // Override JSON Server default router
    server.use(jsonServer.router(newDb));

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

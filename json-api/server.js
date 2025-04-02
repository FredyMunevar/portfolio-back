const jsonServer = require("json-server");
const axios = require("axios");

const server = jsonServer.create();
const router = jsonServer.router({}); // Empty router to start
const middlewares = jsonServer.defaults();

server.use(middlewares);

async function fetchJSON(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return { error: "Data not found" };
  }
}

server.get("/api/en", async (req, res) => {
  const data = await fetchJSON(
    "https://raw.githubusercontent.com/FredyMunevar/portfolio/set-front-end/messages/en.json"
  );
  res.json(data);
});

server.get("/api/es", async (req, res) => {
  const data = await fetchJSON(
    "https://raw.githubusercontent.com/FredyMunevar/portfolio/set-front-end/messages/es.json"
  );
  res.json(data);
});

server.get("/api/projects", async (req, res) => {
  const data = await fetchJSON(
    "https://raw.githubusercontent.com/FredyMunevar/portfolio/set-front-end/data/projects.json"
  );
  res.json(data);
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running on port 3000");
});

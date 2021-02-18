const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title, //: 'Desafio node.js',
    url, //: 'https://github.com/ccunhax2/desafio2',
    techs, //: 'teste',
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const pos = repositories.findIndex(p => p.id === id);

  if (pos < 0)
    return response.status(400).json({ error: 'Repository does not exist.' });

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[pos].likes,
  };

  repositories[pos] = repository;
  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const pos = repositories.findIndex(p => p.id === id);

  if (pos < 0)
    return response.status(400).json({ error: 'Repository does not exist.' });

  repositories.splice(pos, 1);
  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params;

  const pos = repositories.findIndex(p => p.id === id);

  if (pos < 0)
    return response.status(400).json({ error: 'Repository does not exist.' });

  repositories[pos].likes++;
  return response.json(repositories[pos]);
});

module.exports = app;

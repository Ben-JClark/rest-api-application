module.exports = (app) => {
  const projects = require("../controllers/projects.controller");

  app.get("/projects", projects.findAll);

  app.get("/project/:id", projects.getById);

  app.post("/projects", projects.create);

  app.get("/projects/:name", projects.getByName);

  app.put("/project/:id", projects.updateById);

  app.delete("/project/:id", projects.deleteById);

  app.delete("/projects", projects.deleteAll);
};

module.exports = app => {
  const projects = require("../controllers/projects.controller");
 
  //GET all of the projects in the database
  //Example usage: GET http://localhost:3000/projects
  app.get("/projects", projects.findAll);

  //GET a project by id, id value will be in place of "id"
  //Example usage: GET http://localhost:3000/project/1
  app.get("/project/:id", projects.getById);

  //CREATE a new project, the new project data will be in the body
  //Example usage: POST http://localhost:3000/projects
  app.post("/projects", projects.create);
    //Body example
  /*
{
    "id": "20",
    "projectname": "compx304-A2",
    "projectdesc": "A very nasty networking project",
    "startdate": "2021-02-01 08:00",
    "enddate": "2021-02-01 08:00"
}
  */

  //GET a project by name, the name value will be in place of "name"
  //Example usage: http://localhost:3000/projects/Hey There, Interact with Me!
  //DO NOT USE ANY CHARCTERS OUTSIDE OF a-zA-Z _,!
  app.get("/projects/:name", projects.getByName);

  //UPDATE a project with new data (in body) by the project's id (in url)
  //Example usage to update project 1: PUT http://localhost:3000/project/1
  //Body example
  /*
{
    "id": "60",
    "projectname": "Rust",
    "projectdesc": "A very good game",
    "startdate": "2021-02-01 08:00",
    "enddate": "2021-02-01 08:00"
}
  */
  app.put("/project/:id", projects.updateById);

  //DELETE a project by its id
  //Example on POSTMAN: DELETE http://localhost:3000/project/1
  app.delete("/project/:id", projects.deleteById);

  //DELETE ALL
  //Example on POSTMAN: DELETE http://localhost:3000/projects
  app.delete("/projects", projects.deleteAll);
}
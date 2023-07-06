const connection = require("./db");
const db = require("./db");

/**
 * CONSTRUCTOR for Project
 * @param {*} project a JSON project object
 */
const Project = function(project) {
  this.id = project.id;
  this.projectname = project.projectname;
  this.projectdesc = project.projectdesc;
  this.startdate = project.startdate;
  this.enddate = project.enddate;
};

/**
 * GET ALL rows in the Projects database
 * @result is JSON objects containing project properties
 */
Project.getAll = result => {
  //QUERY: select all rows from the projects database
  db.query("SELECT * FROM projects", (err, res) =>{
    if(err){
      console.log("error:", err);
      result(null,err);
      return;
    }
    console.log("projects:", res);
    //Send back all projects as JSON objects
    result(null,res);
  });
}

/**
 * INSERTS a new project into the database
 * @param {*} newProject The new Project object to insert into the project db
 * @param {*} result an error or the newly created object returned as JSON from the database
 * @returns if there has been an error
 */
Project.create = (newProject, result) => {
  //If they haven't passed a project with an id return
  if(newProject == null){
    console.log("Error: you cannot create a null project");
    return;
  }
  //QUERY: insert the project newProject into the db projects and set its properties
  db.query("INSERT INTO projects SET ?", newProject, (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
      return;
    }
    console.log("Created project");
    //return back the inserted object
    result(null, { id: res.insertId, ...newProject });
  });
}

/**
 * GET the project as JSON object by the id in the url feild
 * @param {*} projectId the id of the project to get
 * @param {*} result an error or the JSON object from the database
 * @returns if there has been an error
 */
Project.getById = (projectId, result) => {
  //If they haven't passed a project with an id return
  if(projectId == null){
    console.log("Error: you cannot get a project with a null project id");
    return;
  }
  //QUERY: select the project with the id projectId
  //projectId is sanitized for SQL injection from controller
  db.query("SELECT * FROM projects WHERE id = ?", projectId, (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
      return;
    }
    console.log("Got project by id");
    result(null,res);
  });
}

/**
 * GET the project as JSON object by the name in the url feild
 * @param {*} projectName the name of the project to get
 * @param {*} result an error or the JSON object from the database
 * @returns if there has been an error
 */
Project.getByName = (projectName, result) => {
  //If they haven't passed a valid project name return
  if(projectName == null){
    console.log("Error: you cannot get a project with a null name");
    return;
  }
  //QUERY: select the project with the projectName
  //projectName is sanitized for SQL injection from controller
  db.query("SELECT * FROM projects WHERE projectname = ?", projectName, (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
      return;
    }
    console.log("Got a project by its name");
    result(null,res);
  });
}

/**
 * UPDATE the project with the id projectId to newProject
 * @param {*} projectId the id of the project to update
 * @param {*} newProject the project object that will be updated in the database
 * @param {*} result an error or the updated project from the database as JSON
 * @returns if there has been an error
 */
Project.updateById = (projectId, newProject, result) => {
  //If they haven't passed a project with an id return
  if(newProject == null || newProject.id == null){
    console.log("Error: you cannot update a project with a null id");
    return;
  }
  console.log("updateById newProject id: " + newProject.id + "\nprojectname: " + newProject.projectname);
  //QUERY update the project properties where the id equals projectID
  //The following is at risk of SQL injection
  var queryText = "UPDATE projects SET"
  if(newProject.id != null){
    queryText += " id = " + newProject.id + ",";
  }
  
  if(newProject.projectname != null){
    queryText += " projectname = '" + newProject.projectname + "',";
  }
  
  if(newProject.projectdesc != null){
    queryText += " projectdesc = '" + newProject.projectdesc + "',";
  }
  
  if(newProject.startdate != null){
    queryText += " startdate = '" + newProject.startdate + "',";
  }
  
  if(newProject.enddate != null){
    queryText += " enddate = '" + newProject.enddate + "',";
  }

  //remove the last comma
  queryText = queryText.substring(0, queryText.length - 1);

  //projectID is sanitized for SQL injection from controller
  queryText += " WHERE id = " + projectId;

  console.log("Query statement is: " + queryText);

  //Query the database and get back the JSON object of the updated project
  db.query(queryText, (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
      return;
    }
    console.log("Updated a project by id");
    result(null,res);
  });
}

/**
 * DELETE the project with the id projectId in the db
 * @param {*} projectId the id of the project to delete
 * @param {*} result an error or the result of the deletion in the db
 * @returns if there has been an error
 */
Project.deleteById = (projectId, result) => {
  //If they haven't passed a valid projectId return
  if(projectId == null){
    console.log("Error: you cannot delete a project with a null id");
    return;
  }
  //QUERY: Delete the project from the db where the id matched projectID
  //projectId is sanitized for SQL injection from controller
  db.query("DELETE FROM projects WHERE id = ?", projectId, (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
      return;
    }
    console.log("Deleted a project by its id");
    result(null,res);
  });
}

/**
 * DELETE all rows from the projects database
 * @param {*} result an error or a success statement
 */
Project.deleteAll = result => {
  //QUERY: delete all rows from projects
  db.query("DELETE FROM projects", (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
      return;
    }
    console.log("Deleted all projects");
    result(null, "All rows successfully deleted");
  });
}
module.exports = Project;
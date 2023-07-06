const connection = require("../models/db");
const { connect } = require("../models/db");
const Project = require("../models/projects.model");
 
// controller checks if the request is correct

/**
 * Get all the projects
 * @param {*} req the request, will be null
 * @param {*} res the resonse from Project.getAll()
 */
exports.findAll = (req, res) => {
    //GET ALL rows in the Projects database
    Project.getAll((err,data) =>{
        //IF there is an error set it as a server error
        if(err)
            res.status(500).send({
                message:
                    err.message || "500 Internal Server Error"
            });
        //ELSE return the JSON objects
        else res.send(data);
    });
};

/**
 * Create a new project with Project.create()
 * @param {*} req the data of the object to create in JSON format
 * @param {*} res the response from Project.create()
 */
exports.create = (req, res) => {
    //IF there is no body send back error 400 Bad Request
    if(!req.body){
        res.status(400).send({
            message: "400 Bad Request: no body in post"
        });
    }
    else{
        console.log("req in create: " + req.toString());
        //ELSE create a new project with the request data
        var newProject = new Project({
            id: req.body.id,
            projectname: req.body.projectname,
            projectdesc: req.body.projectdesc,
            startdate: req.body.startdate,
            enddate: req.body.enddate
        });
        //INSERT the new project into the database
        Project.create(newProject, (err, data) => {
            //IF an err is thrown when we create a new project send error 500
            if(err)
                res.status(500).send({
                    message:
                        err.message || "500 Internal Server Error"
                });
            //ELSE return the created JSON object
            else res.send(data);
        });
    };
}

/**
 * Get project as JSON by ID
 * @param {*} req the request variable containing the id of the project to get
 * @param {*} res the response from Project.getById()
 */
exports.getById = (req, res) => {
    //TRY to parse the id as an integer
    try{
        var id = parseInt(req.params.id,10);
        if(Number.isInteger(id)){
            console.log("Getting project with id: " + id);
            //GET the project as JSON object by its id
            Project.getById(id, (err,data) => {
                if(err){
                    res.status(500).send({
                        message:
                            err.message || "500 Internal Server Error"
                    });
                }
                else res.send(data);
            });
        }
        else{
            //The ID is not a number, send back a Bad Request
            res.status(400).send("Bad Request: Invalid ID");
        }
    }
    catch(err){
        //Couldn't convert the ID to int, send back Bad Request
        res.status(400).send("Bad Request: Invalid ID");
    }
}

/**
 * Get project as JSON by its name
 * @param {*} req the request variable containing the name of the project to get
 * @param {*} res the response from Project.getByName()
 */
exports.getByName = (req, res) => {
    var name = req.params.name;
    //Make sure the name doen't contain SQL injection characters
    if(/^[a-zA-Z_,! ]+$/.test(name)){
        console.log("The name: " + name + " is valid");
        //GET the project as JSON object its name 
        Project.getByName(name, (err, data) => {
            if(err){
                res.status(500).send({
                    message:
                        err.message || "500 Internal Server Error"
                });
            }
            else res.send(data);
        });
    }
    else{
        //The Name contains illegal characters, send back Bad Request
        res.status(400).send("Bad Request: Invalid name");
    }
}

/**
 * Update a project with JSON data by the project's id
 * @param {*} req the new data of the project as a JSON object
 * @param {*} res the response from Project.updateByID()
 */
exports.updateById = (req, res) => {
    //TRY to parse the id as an integer
    try{
        var id = parseInt(req.params.id,10);
        if(Number.isInteger(id)){
            //IF there is no body send back error 400 Bad Request
            if(!req.body){
                res.status(400).send({
                    message: "400 Bad Request: no body in post"
                });
            }
            else{
                console.log("Updating project with id: " + id);
                //Create a new Project with the data from the POST body
                var newProject = new Project({
                    id: req.body.id,
                    projectname: req.body.projectname,
                    projectdesc: req.body.projectdesc,
                    startdate: req.body.startdate,
                    enddate: req.body.enddate
                });
                //UPDATE the project in the db with the id
                Project.updateById(id, newProject, (err, data) => {
                    if(err){
                        res.status(500).send({
                            message:
                                err.message || "500 Internal Server Error"
                        });
                    }
                    else{
                        //Send back the newly updated project as JSON
                        res.send(data);
                    } 
                });
            }
        }
        //ELSE the id is not a valid integer, send back Bad Request
        else{
            res.status(400).send({
                message:
                    err.message || "Bad Request: Invalid_ID"
            });
        }
    }
    //The id cannot be parsed as an integer, send back Bad Request
    catch(err){
        res.status(400).send({
            message:
                err.message || "Bad Request: Invalid-ID"
        });
    }
}

/**
 * Delete a project by the project's id 
 * @param {*} req the id of the project to delete
 * @param {*} res the response from Project.deleteById()
 */
exports.deleteById = (req, res) => {
    //TRY to parse the id as an integer
    try{
        var id = parseInt(req.params.id,10);
        //Check the id is an integer
        if(Number.isInteger(id)){
            console.log("Getting project with id: " + id);
            //DELETE the project with the id in the db
            Project.deleteById(id, (err,data) => {
                if(err){
                    res.status(500).send({
                        message:
                            err.message || "500 Internal Server Error"
                    });
                }
                else res.send(data);
            });
        }
        else{
            res.status(400).send("Bad Request: Invalid ID");
        }
    }
    catch(err){
        res.status(400).send("Bad Request: Invalid ID");
    }
}

/**
 * Delete all rows from the Project table
 * @param {*} req the request, will be null
 * @param {*} res the response from Project.deleteAll()
 */
exports.deleteAll = (req, res) => {
    //DELETE all rows from the projects database
    Project.deleteAll((err,data) =>{
        if(err)
            res.status(500).send({
                message:
                    err.message || "500 Internal Server Error"
            });
        //Send back the success statement
        else res.send(data);
    });
};

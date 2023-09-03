# rest-api-application

UOW Web Development paper for third year students. The third assignment tasked to implement REST API to interact with a MySQL database. This uses HTTP Verbs to make requests, HTTP Response codes to indicate status, MySQL database, Node.js, and Express.js back-end.

## Setup

### Required installs

- Node.js
- Postman
- Xampp

### Install and run Xampp

XAMPP is an easy to install Apache distribution containing MariaDB, PHP, and Perl.

Download and install Xampp on your system https://www.apachefriends.org/download.html

For Linux you will have to run the commands to: Change the permissions to the installer

```
chmod 755 xampp-linux-*-installer.run
```

Then run the installer

```
sudo ./xampp-linux-*-installer.run
```

Then in the setup wizard select both components to install
Now start xampp

```
sudo /opt/lampp/lampp start
```

### Clone the repostiory

In a terminal navigate to to the htdocs directory, on linux enter the command

```
cd /opt/lampp/htdocs/
```

clone the repository

```
sudo git clone https://github.com/Ben-JClark/rest-api-application.git
```

### Setup a local MySQL database with phpMyAdmin

If Xampp is running, you can navigate to the url http://localhost/phpmyadmin/
You will then want to create a new database
Click "New", call it 'projects', click 'create'
Then Click 'import' and choose the ProjectsDatabase.sql file from the repository, click 'import'

### Configure db.config.js

db.config.js is configured to have default credentials, update these if required.

### Setup PostMan

Setup an HTTP Postman Workspace

## Making API Calls

1. npm install

```
npm install
```

2. Start the Express web server

```
npm start
```

3. Make api requests using postman on port 3000

## Routes

### Get

GET all of the projects in the database

```
GET http://localhost:3000/projects
```

GET a project by id, here is an example to get the project with id 1

```
GET http://localhost:3000/project/1
```

GET a project by name, the name value will be after /

```
http://localhost:3000/projects/Hey There, Interact with Me!
```

### Post

To create a new project, the new project data will be in the body
Url example

```
POST http://localhost:3000/projects
```

Body example

```
"id": "20",
"projectname": "compx304-A2",
"projectdesc": "networking project",
"startdate": "2021-02-01 08:00",
"enddate": "2021-03-01 08:00"
```

### Put

UPDATE a project with new data (in body) by the project's id (in url)
Url example

```
PUT http://localhost:3000/project/1
```

Body example

```
"id": "60",
"projectname": "Rust",
"projectdesc": "A very good game",
"startdate": "2021-02-01 08:00",
"enddate": "2021-02-01 08:00"
```

### Delete

DELETE a project by its id
Example with deleting a project with id 1

```
DELETE http://localhost:3000/project/1
```

Delete All

```
DELETE http://localhost:3000/projects
```

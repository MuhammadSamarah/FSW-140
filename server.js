const express = require("express");
const mysql = require("mysql");
const db = mysql.createConnection(
{
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fileData'
});
db.connect((err) => {
    if (err){
        throw err;
    } 
    console.log("connection to server was Successful ")
    });

const app = express();
app.get('/createDB',(req, res) => {
    let myQuery = "CREATE Database fileData";
    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("fileData created successfully"); 
    });
});
app.get('/createTable',(req, res) => {
    let myQuery = "CREATE TABLE postings (id INT auto_increment, title VARCHAR(100), message VARCHAR(250), PRIMARY KEY (id))";
    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("postings Table created successfully"); 
    });
});
app.get('/insertRow1', (req, res) =>{
    let post = {title: 'First Post', message: 'This is my first post via a route.'};
    let myQuery = "INSERT INTO postings SET? ";
    db.query(myQuery, post, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("First Row Inserted Successfully");
    });
});

app.get('/insertRow2', (req, res) =>{
    let post = {title: 'Second Post', message: 'This is my second post via a route.'};
    let myQuery = "INSERT INTO postings SET? ";
    db.query(myQuery, post, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("Second Row Inserted Successfully");
    });
});
app.get('/displayRows',(req, res) => {
    let myQuery = "SELECT * FROM postings";
    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("SELECT Query executed successfully"); 
    });
});

app.get('/updateRow/:id', (req, res) => {
    let newTitle = 'This is an update to the title column';
    let myQuery = `UPDATE postings SET title = '${newTitle}' WHERE ID = ${req.params.id}`;

    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("UPDATE Query executed successfully"); 
    });
});
app.get('/deleteRow/:id', (req, res) => {
  let myQuery = `DELETE  FROM postings WHERE ID = ${req.params.id}`;

    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("DELETE Query executed successfully"); 
    });
});

app.listen('3000', () => {
    console.log("Web Server is Running");
});
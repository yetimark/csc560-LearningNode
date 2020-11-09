var express = require('express');
var app = express();
var fs = require('fs');

var userToAdd = {
    "user4" : {
        "name" : "Bilbo",
        "pasword" : "password4",
        "profession" : "Adventurer",
        "id" : 4
    }
};

app.get('/users', function (req, res) {
    fs.readFile(__dirname + "/users.json", 'utf8', function(err, data) {
        console.log(data);
        res.end(data);
    });
});

app.get('/user/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/users.json", 'utf8', function(err, data) {
        users = JSON.parse(data);
        user = users["user" + req.params.id];

        console.log(user);
        res.end(JSON.stringify(user));
    });
});

app.post('/addUser', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/users.json", 'utf8', function(err, data) {
        data = JSON.parse(data);
        data["user4"] = userToAdd["user4"];

        console.log(data);
        res.end(JSON.stringify(data));
    });
});

app.delete('/deleteUser', function (req, res) {
    fs.readFile(__dirname + "/users.json", 'utf8', function(err, data) {
        data = JSON.parse(data);
        delete data["user" + 2];

        console.log(data);
        res.end(JSON.stringify(data));
    });
});

var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});
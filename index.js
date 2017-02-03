var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 2000));
app.use(express.static(__dirname + '/build'));

app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({    
    extended: true
}));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/build/index.html')
});

app.get('/catalog', function(request, response) {
    response.sendFile(__dirname + '/build/catalog.html')
});

app.post('/massage', function(req, res) {
    
    var massage = {
        name: req.body.name,
        email: req.body.email,
        massage: req.body.massage
    };
    
    res.send(JSON.stringify(massage));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

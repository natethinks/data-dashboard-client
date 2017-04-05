var express = require('express');
var request = require('superagent');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views/');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index');
})

app.get('/movies', function(req, res){
  request
    .get('http://localhost:8080/movies')
    .end(function(err, data) {
      if(data.status == 403){
        res.send(403, '403 Forbidden');
      } else {
        var movies = data.body;
        res.render('movies', { movies: movies} );
      }
    })
})

app.get('/authors', function(req, res){
  request
    .get('http://localhost:8080/reviewers')
    .end(function(err, data) {
      if(data.status == 403){
        res.send(403, '403 Forbidden');
      } else {
        var authors = data.body;
        res.render('authors', {authors : authors});
      }
      })
})

app.get('/publications', function(req, res){
  request
	.get('http://localhost:8080/publications')
	.end(function(err, data) {
	  if(data.status == 403) {
		res.send(403, '403 forbidden') 
	  } else {
		var publications = data.body;
		res.render('publications', {publications : publications});
	  } 
	  })
})


app.listen(3000);

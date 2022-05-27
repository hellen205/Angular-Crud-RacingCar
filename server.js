const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
app.use(
  helmet({
    noCache: true
  })
);
app.use(
  hsts({
    maxAge: 15552000 // 180 days in seconds
  })
);

app.use(
  express.static(path.join(__dirname, 'dist/trexis-racing'), {
    etag: false
  })
);

function verifyToken(req,res,next){
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === "null") {
    return res.status(401).send('unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload){
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}

app.post('/api/login',(req, res) => {
  console.log(req.body);
  if (!req.body.username || req.body.username.length < 2) {
    res.status(400).send('username is required & Min length is 3');
  }
  if (!req.body.password || req.body.password.length < 2) {
    res.status(400).send('password is required & Min length is 3');
  }

  let user = {
    username : "Hellen",
    password : "Lucky"
  }
  jwt.sign(user = user,'secretKey',{expiresIn:'20s'},(err, token) => {
    res.json({
      token
    })
  })
})

app.get('/api/members', verifyToken , (req, res) => {
  request('http://localhost:3000/members', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});


app.get('/api/teams', (req, res) => {
  request('http://localhost:3000/teams', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

app.get('/api/members/:id', (req, res) => {
  let options = {
      url: 'http://localhost:3000/members/' + req.params.id
  };
  request.get(options, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
 
});

// Submit Form!
app.post('/api/addMember', (req, res) => {
    let options = {
      url: 'http://localhost:3000/members',
      form: req.body
  };

  request.post(options, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

app.put('/api/members/:id', (req, res) => {
 
  let options = {
      url: 'http://localhost:3000/members/' + req.params.id,
      form: req.body
  };

  request.put(options, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
 
});

app.delete('/api/members/:id', (req, res) => {
 
  let options = {
      url: 'http://localhost:3000/members/' + req.params.id,
  };

request.delete(options, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/trexis-racing/index.html'));
});

app.listen('8000', () => {
  console.log('Vrrrum Vrrrum! Server starting!');
});

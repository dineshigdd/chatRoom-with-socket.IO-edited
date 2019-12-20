'use strict';

const express     = require('express');
const session     = require('express-session');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const auth        = require('./app/auth.js');
const routes      = require('./app/routes.js');
const mongo       = require('mongodb').MongoClient;
const passport    = require('passport');
const cookieParser= require('cookie-parser')
const app         = express();
const http        = require('http').Server(app);
const sessionStore= new session.MemoryStore();
const cors = require('cors');
const io = require('socket.io')(http);



// Documentation for mongodb here
// http://mongodb.github.io/node-mongodb-native/3.2/api/

// Do not put this under fccTesting(app)
// otherwise your tests won't pass
app.use(cors());

fccTesting(app); //For FCC testing purposes

app.use('/public', express.static(process.cwd() + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  key: 'express.sid',
  store: sessionStore,
}));


mongo.connect(process.env.DATABASE,{ useUnifiedTopology: true }, (err, db) => {
    if(err) console.log('Database error: ' + err);
  
    
    auth(app, db);
    routes(app, db);
      
    http.listen(process.env.PORT || 3000);

    var currentUsers = 0;
    //start socket.io code  
    io.on('connection', socket => {
          ++currentUsers;
          io.emit('user count', currentUsers);
           // console.log('A user has connected');
      
    
    
    }).on('disconnect', socket => {
        --currentUsers;
        io.emit('user count',currentUsers);
    });
  
    //end socket.io code
  
  
});

// import express package
const express=require('express');
//import mongodb package
const mongodb=require('mongodb');
const bodyParser = require('body-parser');


var cors = require('cors');

const path = require('path');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

var db;    
 
var MongoClient = mongodb.MongoClient;  //get instance of MongoClient to establish connection


 MongoClient.connect( process.env.MONGODB_URI, function(err, client){
      if ( err ) throw err;
      db= client.db("pp");
    }   // end of function
	);
	
	
//create express app
var app = express();
app.use(cors()) 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use(express.static('public'))   // to serve static files

app.use(express.static(path.join(__dirname, 'public')))

 .get('/', (req, res) => res.sendFile(path.join(__dirname, '../public', 'index.html')))

 

var originsWhitelist = [ 'http://localhost:4200',
   'https://ngdemotwo.herokuapp.com','ngdemotwo.herokuapp.com:443','ngdemotwo.herokuapp.com'
];

var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}


app.use(cors(corsOptions));




app.listen(process.env.PORT || 3000, function(){
  console.log('Server up: localhost:3000');
});



// get summary  current latest date details

app.get('/summary', function(req, res ){
    
	
 //db.collection ('ticketnow').find().sort({_id:-1}).limit(1).toArray(function(err, docs) 
  db.collection ('ticketnow').find({}).project({"_id":0,"name":1,"percent_change_24h":1,"market_cap_usd":1,
  "price_usd":1,"total_supply":1, "volume_usd_24h" :1,"last_updated":1}).toArray(function(err, jsondata) {
    console.log("Found the following records");
	//console.log(jsondata)
    //jsondata=docs;
 res.send(jsondata);
  });
  
  
  
});
// get detail data
app.post('/detail', upload.array(), function(req, res ){


 
 // get the cuurency name and the max date
 // extract data for the current and last 30 days
var currency=req.body.currencyname;
currency=currency.trim();
console.log(req);
console.log(currency);
var currentdate= Number(req.body.currencydate);
console.log(currentdate);
var begindate=currentdate-30*24*60*60;    // 30 days from
console.log(begindate);
//currency='AdEx';
//currentdate=1509525561;
//begindate=1506933561;

 

  db.collection ('ticket').find( { "name":currency, "last_updated": {$gte:begindate,$lte:currentdate} 
  }).project({"_id":0,"name":1,"percent_change_24h":1,"market_cap_usd":1,
  "price_usd":1,"total_supply":1, "volume_usd_24h" :1,"last_updated":1}).toArray(function(err, jsondata) {
  console.log("Found the following records");
  //console.log(jsondata);
  res.send(jsondata);
  });
   
  
});

 
 


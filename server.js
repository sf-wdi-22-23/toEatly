// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser");


// CONFIG //
// set ejs as view engine
app.set('view engine', 'ejs');
// serve js & css files
app.use("/static", express.static("public"));
// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

// DATA //
var foods =[
  {id: 0, name: "Sushiritto", yumminess: "quite"},
  {id: 1, name: "Green Eggs & Ham", yumminess: "sure"},
  {id: 2, name: "Crayfish", yumminess: "depending"},
  {id: 3, name: "Foie Gras", yumminess: "omg"},
  {id: 4, name: "Kale", yumminess: "meh"}
];

// ROUTES //
app.get("/", function (req, res){
  // render index.html and send with foods data filled in
  res.render('index', {foods: foods});
});

// api route to get all foods
app.get("/api/foods", function (req, res){
  // send foods data as JSON
  res.json(foods);
});

app.listen(3000, function (){
  console.log("listening on port 3000");
});
// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser"),
    views = path.join(process.cwd(), "views/");


// CONFIG //
// set ejs as view engine
app.set('view engine', 'ejs');
// serve js & css files
app.use("/static", express.static("public"));
// body parser config to accept all datatypes
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
  // render index.html and send foods
  res.render('index', {foods: foods});
});

// foods api path
app.get("/api/foods", function (req, res){
  // render foods data as JSON
  res.json(foods);
});

app.post("/api/foods", function (req, res){
  var newFood = req.body;
  // add a unique id
  newFood.id = foods[foods.length - 1].id + 1;
  // add new food to DB (which, in this case, is an array)
  foods.push(newFood);
  // send a response with newly created object
  res.json(newFood);
});

app.listen(3000, function (){
  console.log("listening on port 3000");
});
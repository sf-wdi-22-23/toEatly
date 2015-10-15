// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser");

// module.exports from ./utils/findWhere.js file
// is returned when we require that file name 
//
var findWhere = require("./utils/findWhere.js");

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

// api route to get all foods (we don't use)
app.get("/api/foods", function (req, res){
  // send foods data as JSON
  res.json(foods);
});

// api route to create new food
app.post("/api/foods", function (req, res){
  var newFood = req.body;
  // add a unique id
  if (foods.length !== 0){
	  newFood.id = foods[foods.length - 1].id + 1;
  } else {
  	newFood.id = 0;
  }
  // add new food to DB (which, in this case, is an array)
  foods.push(newFood);
  // send a response with newly created object
  res.json(newFood);
});

// api route to delete a food
app.delete("/api/foods/:id", function (req, res){
  // set the value of the id
  var targetId = parseInt(req.params.id);
  // find item in the array matching the id
  var targetItem = findWhere(foods, {id: targetId});
  // get the index of the found item
  var index = foods.indexOf(targetItem);
  // remove the item at that index, only remove 1 item
  foods.splice(index, 1);
  // send back deleted object
  res.json(targetItem);
});


// api route to update a food
app.patch("/api/foods/:id", function(req, res){
  // set the value of the id
  var targetId = parseInt(req.params.id);
  // find item in the array matching the id
  var targetItem = findWhere(foods, {id: targetId});
  // edit object, but don't change name or yumminess 
  // if the request's values for them are blank 
  targetItem.name = req.body.name || targetItem.name;
  targetItem.yumminess = req.body.yumminess || targetItem.yumminess;
  // send back edited object
  res.json(targetItem);
});

app.listen(3000, function (){
  console.log("listening on port 3000");
});
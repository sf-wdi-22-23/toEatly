// On page load
$(function() {
  pageLoad();
});

// function definitions

function pageLoad() {
  // load foods
  getFoods();
  // set event listeners
  $("#new-food-form").on("submit", function(e){
    // prevent form submission
    e.preventDefault();
    // post to food#create
    $.post("/api/foods", $(this).serialize())
      .done(function(res){
        // append new food to the page
        getFoods();
        $("#new-food-form")[0].reset();
      });
  });
}

function getFoods() {
  $.get("/api/foods", function(response){ 
    var foods = response.reverse();
    // grab foods template
    renderFoods(foods);
  });
}

function renderFoods(foods) {
  template = _.template($("#foods-template").html());
  // input foods into template and append to parent
  foodItems = foods.map(function(food) {
    return template(food);
  });
  // clear content (for repeated use)
  $("#food-ul").html("");
  // append foods to ul
  $("#food-ul").append(foodItems);
}

function deleteFood(context) {
  var foodId = $(context).data().id;
  $.ajax({
    url: '/api/foods/' + foodId,
    type: 'DELETE',
    success: function(res) {
      // once successfull, re-render all foods
      getFoods();
    }
  });
}

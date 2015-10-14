// CLIENT-SIDE JAVASCRIPT
// On page load
$(document).ready(function(){
  pageLoad();
});

// function definitions

function pageLoad() {
  // set event listeners
  $("#new-food-form").on("submit", function(e){
    // prevent form submission
    e.preventDefault();
    // post serialized form to server
    $.post("/api/foods", $(this).serialize(), function(response){
      // append new food to the page
      var newFood = response;
      // clear new food form
      var foodString = makeHTMLString(newFood);
      $("#food-ul").prepend(foodString);
      // reset the form 
      $("#new-food-form")[0].reset();
      // give focus back to the food name input
      $("#food-name-input").focus();
    });
  });
}

function makeHTMLString(food) {
  return "<li class='list-group-item'>" + food.name + 
    " <span class='label label-default'>"+food.yumminess+"</span>" +
    "</li>";
}

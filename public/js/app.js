// On page load
$(document).ready(function(){
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
    // post serialized form to food#create
    $.post("/api/foods", $(this).serialize(), function(response){
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
  // clear content (for repeated use)
  $("#food-ul").html("");
  // loop over the foods and append to ul
  for (var i=0; i<foods.length; i++) {
    $("#food-ul").append("<li class='list-group-item'>" + foods[i].name + 
      " <span class='label label-default'>"+foods[i].yumminess+"</span>" +
      "<button data-id="+foods[i].id+" onclick='deleteFood(this)' type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
      "</li>");
  }
}

function deleteFood(context) {
  var foodId = $(context).data().id;
  $.ajax({
    url: '/api/foods/' + foodId,
    type: 'DELETE',
    success: function(response) {
      // once successful, re-render all foods
      getFoods();
    }
  });
}

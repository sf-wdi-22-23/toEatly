// On page load
$(document).ready(function(){
  pageLoad();
});

// function definitions

function pageLoad() {
  // load foods
  // set event listeners
  $("#new-food-form").on("submit", function(e){
    // prevent form submission
    e.preventDefault();
    // post serialized form to server
    $.post("/api/foods", $(this).serialize(), function(response){
      // append new food to the page
      var newFood = response;
      $("#food-ul").prepend("<li class='list-group-item'>" + newFood.name + 
        " <span class='label label-default'>"+newFood.yumminess+"</span>" +
        "<button data-id="+newFood.id+" onclick='deleteFood(this)' type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "</li>");
      // clear new food form
      $("#new-food-form")[0].reset();
    });
  });
}

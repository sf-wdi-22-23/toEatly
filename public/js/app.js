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
      $("#new-food-form")[0].reset();
    });
  });

  // set event listener for all delete buttons
  $(document).on('click', 'button.close', function(e){
    deleteFood(this);
  });
}

function deleteFood(context) {
  // console.log('context in deleteFood: ', context);
  // context is the button that was clicked
  var foodId = $(context).data().id;
  $.ajax({
    url: '/api/foods/' + foodId,
    type: 'DELETE',
    success: function(response) {
      // once successful, remove food from the DOM
      $(context).closest('li').remove();
    }
  });
}

function makeHTMLString(food) {
  return "<li class='list-group-item'>" + food.name + 
    " <span class='label label-default'>"+food.yumminess+"</span>" +
    "<button data-id="+food.id+" type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
    "</li>";
}

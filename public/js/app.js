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

  // set event listener for all delete buttons
  $(document).on('click', 'button.close', function(e){
    deleteFood(this);
  });

  // set event listener for all edit forms
  $(document).on('submit', 'form.edit', function(e){
    e.preventDefault();
    updateFood(this);
  });
}

function deleteFood(context) {
  console.log('context in deleteFood: ', context);
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

function updateFood(context){
  console.log("serialized: ", $(context).serialize())
  var foodId = $(context).data().id;
  $.ajax({
    url: '/api/foods/' + foodId,
    type: 'PATCH',
    data: $(context).serialize(),
    success: function(response) {
      // once successful, replace food in the DOM
      var newLi = makeHTMLString(response);
      $(context).closest('li').replaceWith(newLi);
    }
  });
}

function makeHTMLString(food) {
  return "<li class='list-group-item'>" + food.name + 
    " <span class='label label-default'>"+food.yumminess+"</span>" +
    "<button data-id="+food.id+" type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
    updateHTMLString(food) +
      "</li>";
}


// creates the 'update' parts of the HTML food string
function updateHTMLString(food){
  var htmlString  = '<!-- form to update food -->\n' + 
      '<div id="update-'+ food.id +'">' +
      '<form class="form-inline edit" data-id=' + food.id +'>' +
      '<input type="text" class="form-control" value="'+ food.name +'" placeholder="Which food?">\n' +
      '<input type="text" class="form-control" value="'+ food.yumminess + '" placeholder="How yummy?">\n'+
      '<input type="submit" class="btn btn-default" value="Update food">' +
      '</form>' +
      '</div>';
  return htmlString;
}

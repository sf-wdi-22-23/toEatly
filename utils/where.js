// original version of our where for toEatly
// findWhere is a bit better for our purposes
// leaving this here for posterity
function where(arr, properties){
  var output;
  var obj;
  for (var i=0; i<arr.length; i++){
    obj = arr[i];
    for (var key in obj){
      if (obj.hasOwnProperty(key) && obj[key] === properties[key]){
          output = obj;
      }
    }
  }
  return output;
}

module.exports = where;
 // loops through an array of objects
 // and returns the first one that matches all key-value pairs
 // in the properties object 
 function findWhere(arr, properties){
  // initialize variables outside array for efficiency
  // (otherwise they get recreated over and over)
  var match;
  var obj;
  // loop through all items in the array
  for (var i=0; i<arr.length; i++){
    obj = arr[i];
    // we start out assuming this object will be a match
    match = true;
    // loop through this one object checking that keys match
    for (var key in properties){
      if (obj.hasOwnProperty(key) && obj[key] === properties[key]){
        // do nothing -- this key matched :D
      } else {
        // the key didn't match! flag this object as bad
        match = false;
        // we can go ahead and break out of the for loop early
        // instead of looking through all the keys
        break;
      }
    } // end of inner for loop

    if (match){
      // if this object matched, we can go ahead and return it!
      return obj;
    }
  } // end of outer for loop

  // if we get all the way here without returning yet,
  // we haven't found any matches
  return null;
}

module.exports = findWhere;
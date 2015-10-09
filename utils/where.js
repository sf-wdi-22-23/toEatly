function where(arr, properties){
  var outputArr = [];
  var obj;
  for (var i=0; i<arr.length; i++){
    obj = arr[i];
    for (key in obj){
      if (obj.hasOwnProperty(key) && obj[key] === properties[key]){
          outputArr.push(obj);
      }
    }
  }
  return outputArr;
}

module.exports = where;
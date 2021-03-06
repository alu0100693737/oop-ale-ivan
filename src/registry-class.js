let inspect = require("util").inspect;
let mapClass;
// Para evitar que nuevas llamadas sobreescriban el map
mapClass = mapClass || new Map();
let addMapClass = (key, clss) => mapClass[key] = clss;
let findClass = (value) => {
  let className = value.constructor.name;
  let CurrentClass = mapClass[className];
  if(className === "Object") {
    CurrentClass = mapClass[value.type];
  }
  let params;
  if((className === "Number") || (className === "String")){
    params = [String(value)];
  }
  else {
    if(className === "Object"){
      if(value.type && value.params) {
        let {className, CurrentClass} = findClass(value.params[0]);
        params = [new CurrentClass(value.params[0]), ...value.params.slice(1)];
      }
      else {
        throw new Error(inspect(value) + "type and params attr required");
      }
    }
  }
  return {className, CurrentClass, params};
};
module.exports = { addMapClass, findClass};

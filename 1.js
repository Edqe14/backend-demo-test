'use strict'

module.exports.checkMethod = async(req) => {
  let method = req.method;
  
  if(method !== 'POST') { //POST def.
    return false;
  } else {
    return true;
  }
}
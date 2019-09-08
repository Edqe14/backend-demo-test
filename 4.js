'use strict'

module.exports.checkUA = async(req) => {
  let UA = req.header('User-Agent')
  
  if(UA !== process.env.USERAGENT) {
    return false;
  } else {
    return true;
  }
}
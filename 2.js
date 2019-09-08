'use strict'

const fs = require('fs')

module.exports.checkIp = async(req, list, options) => {
  if(options) {
    if(typeof options !== 'object') {
      return new Error('Invalid options')
    } else {
      if(options.rawList == true) {
        switch(options.listType) {
          case 'txt':
            list = list.split('\n')
            break;

          case 'json':
            list = JSON.parse(list)
            break;

          default:
            return new Error('Invalid list type!')
            break;
        }
      } 
    }
  } else if(typeof list !== 'object') return new Error('List must be an array/object!')
  
  let ipHeader = await req.header('x-forwarded-for')
  let ip = await ipHeader.split(',')[0]
  
  let findIP = list.find(v => v == ip)
  
  if(!findIP) {
    return false;
  } else {
    return true;
  }
}
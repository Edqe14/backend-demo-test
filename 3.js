'use strict'

// const crypto = require('crypto')
const crypto = require('crypto');

module.exports.checkToken = async(req) => {
  let token = req.header('Request-Content-Token')
  if(!token) return false;
  
  let decrypted = crypto.createHash('sha256').update(token).digest('hex');
  // let bufferToken = Buffer.from(token)
  // let decryptedBuffer = privateDecrypt(process.env.PRIVATE, bufferToken)
  // let decrypted = decryptedBuffer.toString()
  
  if(decrypted !== process.env.HASHTOKEN) {
    return false;
  } else {
    return true;
  }
}
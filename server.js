'use strict'

const method = require('./1.js')
const ip = require('./2.js')
const token = require('./3.js')
const ua = require('./4.js')

const fs = require('fs')

let ipList = fs.readFileSync('data/whitelist.txt', 'utf8')

const express = require('express');
const app = express();

const assets = require('./assets.js')

app.use(express.static('public'));
app.disable('x-powered-by');
app.disable('etag');

let session = []

app.use('/assets', assets)
app.post('/', async function(req, res) {
  await method.checkMethod(req)
  .then(async(m) => {
    if(m) {
      console.log('method')
      
      let options = {
        rawList: true,
        listType: 'txt'
      }
      
      await ip.checkIp(req, ipList, options)
      .then(async ip => {
        if(ip) {
          console.log('ip')
          
          await token.checkToken(req)
          .then(async t => {
            if(t) {
              console.log('token')
              
              await ua.checkUA(req)
              .then(async UA => {
                if(UA) {
                  let ipHeader = await req.header('x-forwarded-for')
                  let ip1 = await ipHeader.split(',')[0]

                  await session.push(ip1)

                  setTimeout(() => {
                    let index = session.indexOf(ip)
                    session.splice(index, 1)
                  }, 300000)

                  console.log('broken')
                  return res.status(200).cookie('file', 'psd').send({
                    status: 200,
                    message: "N1c3 y0u br0k3 1t :) or is it?"
                  })
                } else {
                  return res.status(406).end()
                }
              })
            } else {
              return res.status(403).end()
            }
          })
        } else {
          return res.status(401).end()
        }
      })
    } else {
      return res.status(405).end()
    }
  })
});

app.post('/psd', async(req, res) => {
  let ipHeader = await req.header('x-forwarded-for')
  let ip = await ipHeader.split(',')[0]

  let search = session.find(i => i == ip)
  if(!search) {
    res.status(400).send({err: 'Unwhitelisted'})
  } else {
    res.status(200).send({id: 'VmtWU1QxRXlWbk5qUlZKUVZqSm9UMVpyVlRCTlJsSldWRlJHYTAxck1UVldWbEYzVUZFOVBRPT0='})
  }
})

app.get('/psd/a13x0.psd', async(req, res) => {
  let ipHeader = await req.header('x-forwarded-for')
  let ip = await ipHeader.split(',')[0]

  let search = session.find(i => i == ip)
  if(!search) {
    res.status(400).send({err: "Unwhitelisted"})
  } else {
    res.status(200).download('/assets/a13x0.psd', 'a13x0.psd')
  }
})

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

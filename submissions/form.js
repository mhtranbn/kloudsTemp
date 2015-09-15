var redis = require('then-redis')
var fs = require('fs')

var db = redis.createClient('localhost')

//
// api endpoints
//

import miniapi from './mini-api'
let { get, post } = miniapi;

async function author(data) {
  let ok = db.lpush(`klouds-authors`, JSON.stringify(data))

  return ok
}

async function authors() {
  let result = db.lrange(`klouds-authors`, 0, 10000)
  return result
}

async function contact() {
  return "contact"
}


get `/authors` ( () => authors() )
post `/author` ( (_, data) => author(data) )
post `/contact` ( (_, data) => contact(data) )

miniapi.listen(8080)

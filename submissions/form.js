var redis = require('then-redis')
var fs = require('fs')
// var db = redis.createClient('localhost')

import octo from 'octonode'

let client = octo.auth.config({
  id:'fee3e7a359fd69995df5',
  secret:'194aa7643421af654466cdc86e9cf5d0979fac80'
})

//
// api endpoints
//

import miniapi from './mini-api'
let { get, post } = miniapi;


async function author({data}) {
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

let githubUrl = client.login(['user', 'repo', 'gist'])

let [ _, originalState ] = githubUrl.match(/&state=([0-9a-z]{32})/i)

console.log(githubUrl)
console.log(originalState)

async function github(ctx) {
  let { code, state } = ctx.request.query

  if (!originalState || originalState != state)
    throw "CSRF ERROR"

  octo.auth.login(code, function (err, token) {
    if (err)
      console.error(err)

    console.log('now use the token', token)
  })
}


get `/authors` ( () => authors() )
post `/author` ( (_, data) => author(data) )
post `/contact` ( (_, data) => contact(data) )
get `/github` ( (_, data) => github(data) )

miniapi.listen(8080)

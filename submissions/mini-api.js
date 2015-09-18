/**
 * An API Utility Library
 * @author Daniel Sont
 */

import koa from 'koa'
import cors from 'kcors'
import json from 'koa-json'
import jsonbody from 'koa-json-body'
import route from 'koa-route'
import serve from 'koa-static'

let app = koa();

app.use(cors())
app.use(json())
app.use(jsonbody())


function verbFactory(method) {
  return url => xfn => app.use(
          route[method](url, function* (param) {
            this.body = yield xfn(param, this)
          })
        )
}

let miniApi = {
  get: verbFactory('get'),
  post: verbFactory('post'),
  serve: dir => app.use(serve(dir)),
  listen: port => app.listen(port)
}

export default miniApi

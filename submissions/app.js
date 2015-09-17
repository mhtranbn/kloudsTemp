var koa = require('koa')
  , router = require('koa-router')
  , mount = require('koa-mount')
  , bodyParser = require('koa-bodyparser')
  , koaqs = require('koa-qs')
  , session = require('koa-session')
  , accesslog = require('koa-accesslog')

var Grant = require('grant-koa')
  , grant = new Grant(require('config.json'))

var app = koa()
app.keys = ['secret','key']
app.use(accesslog())
app.use(mount(grant))
app.use(bodyParser())
app.use(session(app))

// koaqs(app)
router = router()

router.get('/handle_git_callback', function *(next) {
  console.log(this.query)
  this.body = JSON.stringify(this.query, null, 2)
})


app.use(router.routes())

app.listen(3000, function*() {
  console.log('Koa server listening on port ' + 3000)
})

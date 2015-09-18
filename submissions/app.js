import github from 'octonode'

let  = github.auth.config({
  id:'fee3e7a359fd69995df5',
  secret:'194aa7643421af654466cdc86e9cf5d0979fac80'
}).login(['user', 'repo', 'gist'])


// Store info to verify against CSRF
var state = auth_url.match(/&state=([0-9a-z]{32})/i);


function connect() {
  let values = this.request.body
  console.dir(this.request)
  // Check against CS
  assert(!state || state[1] != values.state, "CSRF ERROR")

  github.auth.login(values.code, function (err, token) {
    if (err)
      console.error(err)
    console.log(token)
  })
}

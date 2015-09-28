#!/bin/bash

# Hoangs development script

cd $(dirname $0)


# serve the client
http-server ./ -p 8000 &

# turn on the server
nodemon --exec babel-node submissions/form.js




curlauthors=`curl 'http://localhost:8080/author' -H 'Origin: http://0.0.0.0:8000' -H 'Accept-Encoding: gzip, deflate' -H 'Accept-Language: vi,en-US;q=0.8,en;q=0.6' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36' -H 'Content-Type: json' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Referer: http://0.0.0.0:8000/' -H 'Connection: keep-alive' --data-binary '{"author-name":"Daniel Sont","author-email":"dan.sont@gmail.com","author-github":"ds0nt","author-apps":"forky.io"}' --compressed``

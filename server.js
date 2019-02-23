var express = require('express')
var secure = require('express-force-https');
var path = require('path')
var serveStatic = require('serve-static')
var helmet = require('helmet')

var app = express()
// Middleware
app.use(secure)
app.use(helmet())
app.use("/", serveStatic(path.join(__dirname, '/dist')))

// Catch all routes and redirect to index
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
})

var port = process.env.PORT || 8000
app.listen(port)
console.log('server started ' + port)

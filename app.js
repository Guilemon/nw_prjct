// create application object
var koa = require('koa')
var app = new koa()
var route = require('koa-route')
var serve = require('koa-static')
var path = require('path')
var co = require('co')
// to render html swig template. gets files
// from views folder
var views = require('koa-views')
app.use(views(
    'views',
    {
        map:{
            html:'swig'
    }
}
))

// trust proxy headers for app
app.proy = true

// parse body
var bodyParser = require('koa-bodyparser')
app.use(bodyParser())

app.use(serve(__dirname+'/public'))

var home = require('./routes/homeRoutes.js')
app.use(route.get('/', home.showHome))

app.listen('3000')
console.log('listening app on port 3000')
// create application object
var koa = require('koa')
var app = new koa()
app.use(function(ctx){
    ctx.body = 'hello world!!!!!!!!'
})

app.listen('3000')
console.log('listening koa on port 3000')
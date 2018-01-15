const Koa = require('koa')
    , views = require('koa-views')
    , static = require('koa-static')
    , app = new Koa()
    , convert = require('koa-convert')
    , serve = require('koa-static2')
    , bodyparser = require('koa-bodyparser')


app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(views(__dirname + '/build'))
app.use(convert(serve("/",__dirname + '/build')))
require('./server/router')(app)

app.listen(3000)
console.log('starting at port 3000')
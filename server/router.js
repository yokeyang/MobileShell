module.exports = (app) =>{
    const Router = require('koa-router')
    var router = new Router()
    router.get('/',async (ctx) =>{
        await ctx.render('index')
    })
    router.post('/image',async (ctx) => {
        console.log(ctx.request.body)
    })
    router.post('/post_data', async (ctx) => {
        // console.log((ctx.request.body))
    })
    app.use(router.routes())
        .use(router.allowedMethods())
}
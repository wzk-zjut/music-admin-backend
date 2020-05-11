const koa = require('koa')
const app = new koa()
const Router = require('koa-router')
const router = new Router()

const playList = require('./controller/playlist.js')
router.use('/playlist', playList.routes())
app.use(router.routes())
app.use(router.allowedMethods())
app.use(async (ctx) => {
    ctx.body = 'Hello World'
})
app.listen(3000, () => {
    console.log('服务开启')
})
// MVC
const koa = require('koa')
const app = new koa()
const Router = require('koa-router')
const router = new Router()
const cors = require('koa2-cors')
const koaBody = require('koa-body')
const ENV = 'test-51pwz'
const playList = require('./controller/playlist.js')
const swiper = require('./controller/swiper')
router.use('/playlist', playList.routes())
router.use('/swiper', swiper.routes())
app.use(cors({
    origin: ['http://localhost:9528'],
    credentials: true
}))
// 接受post参数
app.use(koaBody({
    multipart: true,
}))
app.use(async (ctx, next) => {
    ctx.state.env = ENV
    await next()
})
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000, () => {
    console.log('服务开启')
})
// MVC
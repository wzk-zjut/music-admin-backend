const Router = require('koa-router')
const router = new Router()
const callCLoudDB = require('../utils/callCloudDB')

router.get('/getList', async (ctx, next) => {
    // 默认10条
    const query = `db.collection('swiper').get()`
    const res = await callCLoudDB(ctx, 'databasequery', query)
    console.log(res)
})
module.exports = router
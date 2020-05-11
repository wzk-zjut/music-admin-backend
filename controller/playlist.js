const Router = require('koa-router')
const router = new Router()
const getAccessToken = require('../utils/getAccessToken.js')
const rp = require('request-promise')
const ENV = 'test-51pwz'

router.get('/getList', async (ctx, next) => {
    const access_token = await getAccessToken()
    const url = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&env=${ENV}&name=music`
    const options = {
        method: 'POST',
        uri: url,
        body: {
            $url: 'playlist',
            start: 0,
            count: 50,
        },
        json: true
    }
    ctx.body = await rp(options).then((res) => {
        // console.log(res)
        return JSON.parse(res.resp_data).data
    }).catch(() => {

    })
})

module.exports = router
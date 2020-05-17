const Router = require('koa-router')
const router = new Router()
const callCloudFn = require('../utils/callCloudFn')
const callCLoudDB = require('../utils/callCloudDB')

router.get('/getList', async (ctx, next) => {
    const query = ctx.request.query
    const res = await callCloudFn(ctx, 'music', {
        $url: 'playlist',
        start: parseInt(query.start),
        count: parseInt(query.count)
    })
    let data = []
    if (res.resp_data) {
        data = JSON.parse(res.resp_data).data
    }
    ctx.body = {
        data,
        code: 20000,
    }
})
router.post('/updatePlayList', async (ctx, next) => {
    const params = ctx.request.body
    const query = `db.collection('playlist').doc('${params._id}').update({
        data:{
            name:'${params.name}',
            copywriter:'${params.copywriter}'
        }
    })`
    const res = await callCLoudDB(ctx, 'databaseupdate', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})
router.get('/delPlayList', async (ctx, next) => {
    const params = ctx.request.query
    const query = `db.collection('playlist').doc('${params.id}').remove()`
    const res = await callCLoudDB(ctx, 'databasedelete', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})
router.get('/searchList', async (ctx, next) => {
    const params = ctx.request.query
    const query = `db.collection('playlist').where({
        name:db.RegExp({
            regexp:'${params.content}',
            options:'i'
        })
    }).orderBy('createTime','desc').get()`
    const res = await callCLoudDB(ctx, 'databasequery', query)
    let resList = []
    for (let i = 0; i < res.data.length; i++) {
        resList.push(JSON.parse(res.data[i]))
    }
    ctx.body = {
        code: 20000,
        data: resList
    }
})
module.exports = router
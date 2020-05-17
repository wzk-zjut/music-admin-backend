const Router = require('koa-router')
const callCLoudDB = require('../utils/callCloudDB')
const cloudStorage = require('../utils/callCloudStorage')
const router = new Router()

router.get('/list', async (ctx, next) => {
    const params = ctx.request.query
    const query = `db.collection('blog').skip(${params.start}).limit(${params.count}).orderBy('createTime','desc').get()`
    const res = await callCLoudDB(ctx, 'databasequery', query)
    ctx.body = {
        code: 20000,
        data: res.data
    }
})
router.post('/delBlog', async (ctx, next) => {
    const params = ctx.request.body
    const queryBlog = `db.collection('blog').doc('${params._id}').remove()`
    const delBlogRes = await callCLoudDB(ctx, 'databasedelete', queryBlog)
    const queryComment = `db.collection('blog-comment').where({
        blogId:'${params._id}'
    }).remove()`
    const delCommentRes = await callCLoudDB(ctx, 'databasedelete', queryComment)
    const delStorage = await cloudStorage.delete(ctx, params.img)
    ctx.body = {
        code: 20000,
        data: {
            delBlogRes,
            delCommentRes,
            delStorage
        }
    }
})
module.exports = router
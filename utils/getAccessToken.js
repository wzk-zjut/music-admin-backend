const rp = require('request-promise')
const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, './access_token.json')
const APPID = 'wxac31a9054b471b15'
const APPSECRET = 'c13de4e74d15fa4373bf96006c62db63'
const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`
const updateAccessToken = async () => {
    const resStr = await rp(url)
    const res = JSON.parse(resStr)
    // console.log(res)
    // 写文件
    if (res.access_token) {
        fs.writeFileSync(fileName, JSON.stringify({
            access_token: res.access_token,
            createTime: new Date()
        }))
    } else {
        await updateAccessToken()
    }
}

const getAccessToken = async () => {
    // 读取文件
    try {
        const readRes = fs.readFileSync(fileName, 'utf8')
        const readObj = JSON.parse(readRes)
        const createTime = new Date(readObj.createTime).getTime()
        const nowTime = new Date().getTime()
        if ((nowTime - createTime) / 1000 / 60 / 60 >= 2) {
            await updateAccessToken()
            await getAccessToken()
        }
        return readObj.access_token
    } catch (error) {
        await updateAccessToken()
        await getAccessToken()
    }
}

setInterval(async () => {
    await updateAccessToken()
}, (7200 - 300) * 1000)
// updateAccessToken()
// console.log(getAccessToken())
module.exports = getAccessToken
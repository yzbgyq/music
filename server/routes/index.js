const router = require('koa-router')()
const axios = require('axios')
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/getRecommendList', async (ctx, next) => {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  const params = ctx.query
  const res = await axios.get(url,{
    headers: {
      referer: 'https://c.y.qq.com/',
      authority: 'c.y.qq.com'
    },
    params: params
  })
  ctx.body = {
    data:res.data
  }
})

module.exports = router

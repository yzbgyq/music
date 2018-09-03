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

// 获取歌词
router.get('/lyric', async (ctx, next) => {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  const params = ctx.query
  const res = await axios.get(url,{
    headers: {
      referer: 'https://c.y.qq.com/',
      authority: 'c.y.qq.com'
    },
    params: params
  })
  let data = res.data
  if (typeof data === 'string') {
    var reg = /^\w+\(({[^()]+})\)$/
    var matches = data.match(reg)
    if (matches) {
      data = JSON.parse(matches[1])
    }
  }
  ctx.body = {
    data:data
  }
})

// 首页歌单
router.get('/getRecommendMusic',async (ctx,next) => {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  const params = ctx.query
  const res = await axios.get(url,{
    headers: {
      referer: 'https://c.y.qq.com/',
      authority: 'c.y.qq.com'
    },
    params: params
  })
  const data = res.data
  ctx.body = {
    data
  }
})

// 排行榜歌单
router.get('/getRank',async (ctx,next) => {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg'
  const params = ctx.query
  const res = await axios.get(url,{
    headers: {
      referer: 'https://c.y.qq.com/',
      authority: 'c.y.qq.com'
    },
    params: params
  })
  const data = res.data
  ctx.body = {
    data
  }
})

module.exports = router

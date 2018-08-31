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


// apiRoutes.get('/lyric', function (req, res) {
//   var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
//   axios.get(url, {
//     headers: {
//       referer: 'https://c.y.qq.com/',
//       host: 'c.y.qq.com'
//     },
//     params: req.query
//   }).then((response) => {
//     var ret = response.data
//     if (typeof ret === 'string') {
//       var reg = /^\w+\(({[^()]+})\)$/
//       var matches = ret.match(reg)
//       if (matches) {
//         ret = JSON.parse(matches[1])
//       }
//     }
//     res.json(ret)
//   }).catch((e) => {
//     console.log(e)
//   })
// })
module.exports = router

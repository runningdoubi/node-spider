const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'zadd7的node_spider'
  })
})

module.exports = router

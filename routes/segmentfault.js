const router = require('koa-router')()
const indexList = require('../services/segmentfault/indexList')

router.prefix('/sf')

router.get('/', async (ctx, next) => {
  ctx.response.redirect('/sf/indexList')
})

router.get("/indexList", async (ctx, next) => {
  let page = ctx.query.page || 1;
  var data = await indexList(page);
  ctx.body = data;
});

module.exports = router
const router = require('koa-router')()
const dyttNew = require("../services/dytt/dyttNew.js")

router.prefix('/dytt')

router.get('/', async (ctx, next) => {
  ctx.response.redirect('/dytt/dyttNew')
})

router.get('/dyttNew', async (ctx, next) => {
  let page = ctx.query.page || 1;
  var list = await dyttNew(page);
  ctx.body = list;
})

module.exports = router 
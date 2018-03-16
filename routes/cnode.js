const router = require('koa-router')()
const indexList = require("../services/cnode/indexList.js")

router.prefix('/cnode')

router.get('/', async (ctx, next) => {
  ctx.response.redirect('/cnode/indexList')
})

router.get('/indexList', async (ctx, next) => {
  let page = ctx.query.page || 1;
  let tab = ctx.query.tab || 'all'
  var list  = await indexList(page, tab);
  ctx.body = {page, tab, result:list}
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router

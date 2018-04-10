const router = require('koa-router')()
const dyttNew = require("../services/dytt/dyttNew.js")
const dyttSearch = require("../services/dytt/dyttSearch.js")

router.prefix('/dytt')

router.get('/', async (ctx, next) => {
  ctx.response.redirect('/dytt/dyttNew')
})

router.get('/dyttNew', async (ctx, next) => {
  let page = ctx.query.page || 1;
  var list = await dyttNew(page);
  ctx.body = {page, result: list};
})

router.get("/dyttSearch", async (ctx, next) => {
  let page = ctx.query.page || 1;
  let keyword = ctx.query.keyword || '';
  let pageSize = ctx.query.pageSize || 10;
  let totalResult = ctx.query.totalResult || 90;
  if (keyword.length < 3) {
    ctx.body = {success: 0, msg: '请输入3个字符以上的关键字'}
    return;
  }
  var list = await dyttSearch(keyword, page, pageSize, totalResult);
  ctx.body = { success: 1, result: list };
});

module.exports = router 
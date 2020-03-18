const router = require('koa-router')()
const getRate = require("../services/exchangeRate/index.js")
const { parse } = require('json2csv');
var iconv = require('iconv-lite');


router.prefix('/exchangeRate')

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'zadd7的node_spider'
    })
})

router.get('/:source-:target', async (ctx, next) => {

    let source = ctx.params.source || 'CYN';
    let target = ctx.params.target || 'USD';
    let result  = await getRate(source, target);
    let fields = ['date', 'week', 'rate', 'rateReverse'];
    let csv = iconv.encode(parse(result, {fields}), 'gbk');
    let data = new Buffer(csv,'binary');
    ctx.set('Content-Type', 'application/vnd.openxmlformats');
    ctx.set("Content-Disposition", "attachment; filename=" + "data.csv");
    console.log("处理数据：",data);
    ctx.body = data;
})


module.exports = router

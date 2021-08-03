const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const util = require('./public/util/util')
const index = require('./routes/index')
const cnode = require('./routes/cnode')
const sf = require('./routes/segmentfault')
const dytt = require('./routes/dytt')
const exchangeRate = require('./routes/exchangeRate')
const path = require('path');
util.replaceAndTrim()

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(path.join(__dirname, 'public')))

app.use(views(path.join(__dirname, 'views'), {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(cnode.routes(), cnode.allowedMethods())
app.use(sf.routes(), sf.allowedMethods());
app.use(dytt.routes(), dytt.allowedMethods());
app.use(exchangeRate.routes(), exchangeRate.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

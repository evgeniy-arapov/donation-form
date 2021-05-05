const Router = require('koa-router')
const router = new Router()
const Donation = require('../models/donation')
const Currency = require('../models/currency')

const apiRouter = new Router({
  prefix: process.env.API_PATH
})

apiRouter.get('/currencies', async (ctx) => {
  const res = await Currency.find({})
  ctx.body = res.map(item => item.toJSON())
})

apiRouter.post('/donate', async ctx => {
  const {
    amount,
    currency
  } = ctx.request.body
  const matchCurrencies = await Currency.find({ code: currency })
  if (!matchCurrencies.length) return ctx.throw(400, 'not available currency with code ' + currency)

  await Donation.create({
    amount,
    currency
  })
  ctx.body = { ok: true }
})

apiRouter.all('*', ctx => ctx.throw(405))

router.use(apiRouter.routes())
router.use(apiRouter.allowedMethods())

module.exports = router

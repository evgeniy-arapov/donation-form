const Router = require('koa-router')
const router = new Router()
const Donation = require('../models/donation')

const apiRouter = new Router({
  prefix: process.env.API_PATH
})

apiRouter.get('/currencies', async (ctx) => {
  ctx.body = [
    {
      name: 'US Dollar',
      code: 'USD',
      symbol: '$',
      rate: 1
    },
    {
      name: 'Euro',
      code: 'EUR',
      symbol: '€',
      rate: 0.897597
    },
    {
      name: 'British Pound',
      code: 'GBP',
      symbol: '£',
      rate: 0.81755
    },
    {
      name: 'Russian Ruble',
      code: 'RUB',
      symbol: '₽',
      rate: 63.461993
    }
  ]
})

apiRouter.post('/donate', async ctx => {
  console.log(ctx.request.body)
  await Donation.create(ctx.request.body)
  ctx.body = { ok: true }
})

apiRouter.all('*', ctx => ctx.throw(405))

router.use(apiRouter.routes())
router.use(apiRouter.allowedMethods())

module.exports = router

const Router = require('koa-router')

const{
  verifyAuth
} = require('../middleware/auth.middleware')

const{
  create,
  orderInfo
} = require('../controller/order.controller')

const {
  verifyOrder
} = require('../middleware/order.middleware')

const orderRouter = new Router({ prefix: '/order' })

orderRouter.post('/teamOrder' , verifyAuth , verifyOrder, create)
orderRouter.get('/:orderId',orderInfo)
// orderRouter.patch('/', verifyAuth, verifyTeamorder, updateTeamorder)

module.exports =orderRouter;
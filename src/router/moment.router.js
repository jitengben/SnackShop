const Router = require('koa-router')

const{
  verifyAuth
} = require ('../middleware/auth.middleware')

const{
  verifyMoment
} = require('../middleware/moment.middleware')

const{
  create
} = require("../controller/moment.controller")

const{
  momentInfo
} = require("../controller/moment.controller")
const momentRouter = new Router({ prefix: '/moment' })

const{
  fileInfo
} = require('../controller/moment.controller')

momentRouter.post('/' , verifyAuth , verifyMoment, create)
momentRouter.get('/:productId',momentInfo)
momentRouter.get('/images/:filename',fileInfo)

module.exports = momentRouter;
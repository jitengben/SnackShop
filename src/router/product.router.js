const Router = require('koa-router')

const{
  verifyAuth
} = require ('../middleware/auth.middleware')


const {
  create,
  fileInfo,
  list,
  productCount,
  productInfo
} = require('../controller/product.controller')

const {
  verifyProduct
} = require('../middleware/product.middleware')

const productRouter = new Router({ prefix: '/product' })

productRouter.post('/' , verifyAuth , verifyProduct, create)
productRouter.get('/images/:filename',fileInfo)
productRouter.get('/productCount',productCount)

productRouter.get('/',list)
productRouter.get('/:productId',productInfo)
module.exports = productRouter;
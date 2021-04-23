const errorTypes = require('../constants/error-types')
const service = require('../service/product.service')
const verifyProduct = async (ctx,next) => {
  //1.获取商品相关信息
  const { 
    productName, productOriginalPrice, productFavorablePrice, productClassification 
  } = ctx.request.body;
  //2.判断商品信息不能为空
  if(!productName || !productOriginalPrice || !productFavorablePrice || !productClassification  ){
    const error = new Error(errorTypes.PRODUCTMESSAGE_IS_REQUIRED)
    return ctx.app.emit("error",error,ctx)
  }

  //3.判断这次注册的商品名是没有被注册过的
  const result = await service.getProductByName(productName);
  if(result.length){
    const error = new Error(errorTypes.PRODUCT_ALREADY_EXISTS);
    return ctx.app.emit('error',error,ctx)
  }
  await next();
}



module.exports = {
  verifyProduct
}
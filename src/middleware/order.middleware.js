const errorTypes = require('../constants/error-types')
const orderService = require('../service/order.service')
const verifyOrder = async (ctx,next) => {
 try {
    //1.获取订单相关信息
  const { 
    userId, price, status,address,productId
  } = ctx.request.body;
  //2.判断订单信息不能为空
  if( !price || !status || !address || !productId){
    const error = new Error(errorTypes.ORDERMESSAGE_IS_REQUIRED)
    return ctx.app.emit("error",error,ctx)
  }
  await next();
 } catch (error) {
   console.log(error)
 }
}


module.exports = {
  verifyOrder
}
const errorTypes = require('../constants/error-types')
const teamorderService = require('../service/teamorder.service')
const verifyTeamorder = async (ctx,next) => {
 try {
    //1.获取拼单相关信息
  const { 
    productId 
  } = ctx.request.body;
  const { id } = ctx.user;
  //2.判断商品信息不能为空
  if(!productId || !id ){
    const error = new Error(errorTypes.PRODUCTID_OR_USERID_IS_REQUIRED)
    return ctx.app.emit("error",error,ctx)
  }
  
  //3.判断这次注册的商品名是没有被注册过的
  const result = await teamorderService.isTeamorder(productId, id);
  if(result.length){
    const error = new Error(errorTypes.TEAMORDER_ALREADY_EXISTS);
    return ctx.app.emit('error',error,ctx)
  }
  await next();
 } catch (error) {
   console.log(error)
 }
}


module.exports = {
  verifyTeamorder
}